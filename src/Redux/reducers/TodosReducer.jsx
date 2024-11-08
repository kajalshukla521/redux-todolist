// src/Store/reducers/todosReducer.js
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO } from '../actions/ActionTypes';

const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { ...action.payload, completed: false }],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.updatedText } : todo
        ),
      };
    default:
      return state;
  }
};

export default todosReducer;
