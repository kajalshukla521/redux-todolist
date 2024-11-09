
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './Components/TodoList';


const App = () => (
  <Provider store={store}>
    <div>
      
      <TodoList />
    </div>
  </Provider>
);

export default App;
