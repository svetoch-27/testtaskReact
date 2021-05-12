// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import Todos from './components/Todo/Todos';

function App() {
 
  // state = {
  //   tasks:
  //    [
  //     {        id: 0,        completed: false,        title: 'Task1'      },
  //     {        id: 1,        completed: false,        title: 'Task2'      },
  //     {        id: 2,        completed: false,        title: 'Task3'      }
  //   ]
  // }

  const defaultTodos = [
    {id: 1, name:'Задача 1', completed: false, onChangeTask: 'onChangeTask', onDeleteTask: 'onDeleteTask', onRestoreTask:'onRestoreTask' },
    // {      id: 2,      name:'Задача 2',      completed: false,    },
    // {      id: 3,      name:'Задача 3',      completed: false,    },
    {id: 4, name:'Задача 4', completed: true, onChangeTask: 'onChangeTask', onDeleteTask: 'onDeleteTask', onRestoreTask:'onRestoreTask' },
  ];

  const tasksActiv = defaultTodos;
  const tasksComplited = [];




  const [state, setState] = useState(defaultTodos);
  const [item, setItem] = useState('');
  const [list, setList] = useState('');

  const onChangeTask = () => {}
  const onDeleteTask = () => {}
  const onRestoreTask = () => {}


  // const handleSubmit = (e) => {
  //   const newItem = {
  //     id: 1, //uuidv4(),
  //     item: item,
  //     complete: false,
  //   };
  //   e.preventDefault();
  //   if (item) {
  //     setList([...list, newItem]);
  //     setItem("");
  //   }
  // };

  // const handleChange = (e) => {
  //   setItem(e.target.value);
  // };

  // tasksActiv = defaultTodos.map(item => (item.completed='false' ? item :) );  
  // tasksComplited = defaultTodos.map(item => (item.completed='true' ? item : null) );

  return (
    <div className="App">
      <h1>Тестовое задание</h1>
      <h2>Активные задачи</h2>
      {/* <Todos/> */}

      <div className='tasks task__activ'>
        {tasksActiv.map(item => (
          <Todos
            key={item.id}
            name={item.name}
            // onChangeTask={onChangeTask}
            // onDeleteTask={onDeleteTask}
            // onClick={onItemClick}
            // onDoubleClick={onItemDoubleClick}
            data={item}
          />)
        )}
      </div>

      <div className='indent'></div>
      
      <h2>Завершенные задачи</h2>
      <div className='tasks task__completed'>
        {tasksComplited.map(item => (
          <Todos
            key={item.id}
            name={item.name}
            // onRestoreTask={onRestoreTask}
            // onClick={onItemClick}
            // onDoubleClick={onItemDoubleClick}
            data={item}
          />)
        )}
      </div>

      
    </div>
  );
}

export default App;
