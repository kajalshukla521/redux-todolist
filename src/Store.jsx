// src/Store.jsx
import { createStore } from 'redux';
import todosReducer from './Store/reducers/TodosReducer'; 

const store = createStore(
  todosReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
