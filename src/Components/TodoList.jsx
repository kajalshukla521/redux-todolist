import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, updateTodo } from '../Redux/actions/TodoActions';
import { ToastContainer, toast } from 'react-toastify';
import Modal from './Modal';
import 'react-toastify/dist/ReactToastify.css';

const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');
  
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();




  // Load todos from localStorage when the component mounts 1
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      savedTodos.forEach((todo) => dispatch(addTodo(todo)));
    }
  }, [dispatch]);




  // Save data to  localStorage whenever the todos state changes2
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (todoText.trim()) {
      const newTodo = { id: Date.now(), text: todoText, completed: false };
      dispatch(addTodo(newTodo));
      setTodoText('');
      toast.success('Todo added successfully!');
    } else {
      toast.error('Please enter a valid todo!');
    }
  };




  // Open Modal for Update
  const handleOpenModal = (todo) => {
    setIsModalOpen(true);
    setCurrentTodoId(todo.id);
    setUpdatedText(todo.text);
  };




  // Save Updated Todo
  const handleSaveUpdate = () => {
    if (updatedText.trim()) {
      dispatch(updateTodo(currentTodoId, updatedText));
      setIsModalOpen(false);
      toast.success('Todo updated successfully!');
    } else {
      toast.error('Please enter a valid update!');
    }
  };




  // Delete Todo
  const handleDeleteTodo = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      dispatch(removeTodo(id));
      toast.info('Todo deleted successfully!');
    }
  };

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>

        <div className="mb-6">
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Add a new todo"
            className="w-full px-4 py-3 mb-4 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md"
            >
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleOpenModal(todo)}
                  className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Remove
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
      />

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default TodoList;
