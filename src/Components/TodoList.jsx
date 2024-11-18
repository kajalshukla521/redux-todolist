import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, updateTodo, clearAllTodos } from '../Redux/actions/TodoActions';
import { ToastContainer, toast } from 'react-toastify';
import Modal from './Modal';
import 'react-toastify/dist/ReactToastify.css';
import { GrCompliance } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdClear } from "react-icons/md";




const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');



  const todos = useSelector((state) => state.todos || []);
  const dispatch = useDispatch();





  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (todos.length === 0 && savedTodos.length > 0) {
      savedTodos.forEach((todo) => dispatch(addTodo(todo)));
    }
  }, [dispatch, todos.length]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);






  // Add Todo and handle the case for text length
  const handleAddTodo = () => {
    if (todoText.trim() && todoText.length <= 20) {
      const newTodo = { id: Date.now(), text: todoText, completed: false };
      dispatch(addTodo(newTodo));
      setTodoText('');
      toast.success('Todo added successfully!');
    } else if (todoText.length > 20) {
      toast.error('Todo text should be 20 characters or less!');
    } else {
      toast.error('Please enter a valid todo!');
    }
  };





  // Handle Enter key press for adding todo
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };




  // Open modal to update todo
  const handleOpenModal = (todo) => {
    setIsModalOpen(true);
    setCurrentTodoId(todo.id);
    setUpdatedText(todo.text);
  };




  // Save updated todo
  const handleSaveUpdate = () => {
    if (updatedText.trim()) {
      dispatch(updateTodo(currentTodoId, updatedText));
      setIsModalOpen(false);
      toast.success('Todo updated successfully!');
    } else {
      toast.error('Please enter a valid update!');
    }
  };




  // Open delete confirmation modal
  const handleOpenDeleteModal = (id) => {
    setCurrentTodoId(id);
    setIsDeleteModalOpen(true);
  };


  // Confirm delete action
  const handleConfirmDelete = () => {
    dispatch(removeTodo(currentTodoId));
    toast.info('Todo deleted successfully!');
    const updatedTodos = todos.filter((todo) => todo.id !== currentTodoId);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setIsDeleteModalOpen(false);
  };

//clear all data 
  const handleClearAll = () => {
    dispatch(clearAllTodos());
    localStorage.setItem('todos', JSON.stringify([])); 
  };
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 text-white px-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-gray-800 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">Todo List</h1>

          <button
            onClick={handleClearAll}
            className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none transition-all"
          >
            <MdClear size={20} />
          </button>

        </div>

        <div className="mb-6">
          <input
            type="text"
            value={todoText}
            maxLength={20}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new todo"
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleAddTodo}
            className="w-full mt-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-4">

          {/* Reverse the order of todos here */}
          {todos.slice().reverse().map((todo) => (

            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''} truncate`}>
                {todo.text}
              </span>
              <div className="flex gap-4">
                <button
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className="p-3 text-white bg-yellow-400 rounded-full hover:bg-yellow-500 focus:outline-none transition-all"
                >
                  <GrCompliance size={20} />
                </button>
                <button
                  onClick={() => handleOpenModal(todo)}
                  className="p-3 text-white bg-green-500 rounded-full hover:bg-green-600 focus:outline-none transition-all"
                >
                  <RxUpdate size={20} />
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(todo.id)}
                  className="p-3 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none transition-all"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Updating Todo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUpdate}
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
        isDeleteModal={false}
      />

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSave={handleSaveUpdate}
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
        isDeleteModal={true}
        onDeleteConfirm={handleConfirmDelete}
      />



      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default TodoList;
