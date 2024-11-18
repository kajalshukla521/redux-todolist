//todosReducer.js
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, UPDATE_TODO,CLEAR_ALL_TODO } from '../actions/ActionTypes';

const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  //control statement 
  switch (action.type) {
    case ADD_TODO:
      return {   //its return new state

        //spread operator
        
        ...state,
        //heare update todo arrray                   // it is new todo items 
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



      case CLEAR_ALL_TODO:
      return []; // Clear all todos
    default:
      return state;
  }
};

export default todosReducer;
