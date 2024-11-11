// /Store.jsx
import { createStore } from 'redux';
import todosReducer from './Redux/reducers/TodosReducer'; 
const store = createStore(
  todosReducer,
);

export default store;



