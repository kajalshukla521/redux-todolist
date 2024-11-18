//todoActions.js
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO,CLEAR_ALL_TODO } from './ActionTypes';

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const updateTodo = (id, updatedText) => ({
  type: UPDATE_TODO,
  payload: { id, updatedText },
});



export const clearAllTodos = () => ({
  type:CLEAR_ALL_TODO,

});
