
import React from 'react';
import { Provider } from 'react-redux';
import store from './Store';
import TodoList from './Components/TodoList';


const App = () => (
  <Provider store={store}>
    <div>
      <h1>Todo List</h1>
      <TodoList />
    </div>
  </Provider>
);

export default App;
