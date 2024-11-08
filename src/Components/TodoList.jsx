import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, updateTodo } from '../Redux/actions/TodoActions';

const TodoList = () => {
  const [todoText, setTodoText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoText.trim()) {
      const newTodo = { id: Date.now(), text: todoText };
      dispatch(addTodo(newTodo));
      setTodoText('');
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
                  onClick={() => dispatch(updateTodo(todo.id, 'Updated Text'))}
                  className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                >
                  Update
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
