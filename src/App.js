// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import Todos from './components/Todo/Todos';
import axios from 'axios'
// import styles from '../css/TodoCSS.css';

function App() {

  const apiURL = 'http://185.246.66.84:3000/sarhipenkova/tasks';
  // const getData = async () => {
  //     const response = await axios.get(apiURL)
  //     setParTodos(response.data)
 
  // state = {
  //   tasks:
  //    [
  //     {        id: 0,        completed: false,        title: 'Task1'      },
  //     {        id: 1,        completed: false,        title: 'Task2'      },
  //     {        id: 2,        completed: false,        title: 'Task3'      }
  //   ]
  // }

  // let defaultTodos = [
  //   {id: 1, title:'Задача 1', completed: true, onChangeTask: 'onChangeTask', onDeleteTask: 'onDeleteTask', onRestoreTask:'onRestoreTask' },
  //   {id: 2, title:'Задача 2', completed: true, },
  //   {id: 3, title:'Задача 3', completed: false, },
  //   {id: 4, title:'Задача 4', completed: false, onChangeTask: 'onChangeTask', onDeleteTask: 'onDeleteTask', onRestoreTask:'onRestoreTask' },
  // ];

  // const [state, setState] = useState(defaultTodos);
  // const [item, setItem] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState('');  

  useEffect(() => {
    axios.get(apiURL)
    .then(res => setList(res.data))
    .catch(err => setError(err))
  },[]
  )

  {console.log('error: ')};
  {console.log(error)};

  let defaultTodos = list;

  const tasksActiv = defaultTodos.filter(task => task.completed);
  const tasksComplited = defaultTodos.filter(task => !task.completed);

  {console.log(defaultTodos)};
  {console.log(tasksActiv)};
  {console.log(tasksComplited)};

  const onChangeTask = () => {}

  const onDeleteTask = (id) => {
    if(!id) return;
    setList(list.filter(item => item.id !== id))
    }
  
  const onRestoreTask = () => {}

  const addTodo = () => {
    setList( prev =>
      [
        ...prev,
        {
          // id: nanoid(),
          title: 'Новая задача',
          completed: true,
        }
      ]
    );
  }
  // }, [setList])

  // const onDeleteTask = (id) => {
  //   if(!id)
  //     return;
  //     setList(prev =>
  //     prev.filter(item => item.id !== id)
  //   );
  //     }
  // // }, [setList])

  // const toggleTodo = (id) => {
  //   if(!id)
  //     return;
  //     setList(prev =>
  //     prev.map(item => {
  //       if(item.id !== id)
  //         return item;

  //       return {
  //         ...item,
  //         completed: !item.completed
  //       }
  //     })
  //   )
  // }
  // }, [setList])
  
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
      <button onClick={addTodo}>Добавить задачу</button>

      <div className='tasks task__activ'>
        {tasksActiv.map(item => (
          <Todos
            key={item.id}
            title={item.title}
            // onChangeTask={onChangeTask}
            // onDeleteTask={item.onChangeTask}
            // onClick={onItemClick}
            // onDoubleClick={onItemDoubleClick}
            completed = {item.completed}
            
          />)
        )}
      </div>

      <div className='indent'></div>
      
      <h2>Завершенные задачи</h2>
      <div className='tasks task__completed'>
        {tasksComplited.map(item => (
          <Todos
            key={item.id}
            title={item.title}
            // onRestoreTask={onRestoreTask}
            // onClick={onItemClick}
            // onDoubleClick={onItemDoubleClick}
            completed = {item.completed}
          />)
        )}
      </div>

      
    </div>
  );
        }


export default App;
