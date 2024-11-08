// src/Store.jsx
import { createStore } from 'redux';
import todosReducer from './Store/reducers/TodosReducer'; 
const store = createStore(
  todosReducer,
);

export default store;
