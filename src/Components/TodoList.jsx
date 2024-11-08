
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, updateTodo } from '../Store/actions/ActionTypes';

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
    <div>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => dispatch(toggleTodo(todo.id))}>Toggle</button>
            <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
            <button onClick={() => dispatch(updateTodo(todo.id, 'Updated Text'))}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
