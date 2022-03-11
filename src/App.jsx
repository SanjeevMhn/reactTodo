import React from 'react';
import Todo from './components/Todo';

const App = () => {
  return (
    <div className="container">
      <h1 className="text-[2.5rem] text-purple-600 hover:text-green-500 transition-all text-center cursor-pointer">Todo App</h1>
      <Todo/>
    </div>
  )
}

export default App;