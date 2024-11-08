// src/Store/index.js
import { createStore } from 'redux';
import todosReducer from "./reducers/TodosReducer";

const store = createStore(
  todosReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
