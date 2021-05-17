import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import TodoList from './components/Todo/TodoList';

function App() {

  return (    
    <div className="App">
      <TodoList />
    </div>  
  );
        }


export default App;
