// import logo from './logo.svg';
import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';
import Todos from './components/Todo/Todos';
import axios from 'axios'
// import styles from '../css/TodoCSS.css';
import {nanoid} from 'nanoid';

function App() {

  const apiURL = 'http://185.246.66.84:3000/sarhipenkova/tasks';

  const [list, setList] = useState([]);
  const [error, setError] = useState(''); 
  const [changeTask, setChangeTask] = useState({id: 1, title: 'NewTask', change: 'true'}); 

  useEffect(() => {
    axios.get(apiURL)
    .then(res => setList(res.data))
    .catch(err => setError(err))
  },[]
  )

  let defaultTodos = list;

  const tasksActiv = defaultTodos.filter(task => task.completed);
  const tasksComplited = defaultTodos.filter(task => !task.completed);

  function onDeleteTask(id) {
    setList(list.filter(item => item.id !== id));
    }

      function onRestoreTask(tasks) {
        console.log('==================  onRestoreTask  ==========================');
        console.log(tasks.id);
            tasks.completed = !tasks.completed;
            setList(prev => {return[ ...prev.filter(curr => curr.id !== tasks.id), tasks]});
         
      }
  
      function onChangeCheck(tasks) {   
        console.log('==================  onChangeCheck  ==========================');
        console.log(tasks.id); 
        tasks.completed = !tasks.completed;
        setList(prev => {return[ ...prev.filter(curr => curr.id !== tasks.id), tasks]});
      }
   

    function addTodo() {
    setList( prev =>
      [...prev,
        { id: nanoid(), title: 'Новая задача', completed: true, sequence:1, }
      ]    );  }


      const editTodos = (editValue, id) =>{
        const newTodos = [...list]
        newTodos.forEach((todo) => {
          if(todo.id === id)
          todo.title = editValue
          console.log(newTodos)
        })
        setList(newTodos)
      }


  const handleEdit = (editValue, task) => {
    // const newTask = [...list]
    // debugger
    // newTask.forEach((task, index, newTask) => {
    //   if(index === id){
    //     task.title = editValue
    //     console.log('==================  index  ==========================');
    //     console.log('index ' + index + '    ----id ' + id);
    //   }
    // })
    // debugger
    // setList(newTask)
    setList(prev => {
      return[
        ...prev.filter(curr => curr.id !== task.id),
        {
          id: task.id, 
          title: editValue, 
          completed: task.completed, 
          sequence: task.sequence, 
        }
      ]
    })
  }

  


  return (
    
    <div className="App">
      <h1>Тестовое задание</h1>
      <h2>Активные задачи</h2>
      <button onClick={addTodo}>Добавить задачу</button>

      <div className='tasks task__activ'>
        {tasksActiv.map((task) => (          
          <Todos
            task={task}
            editTodos={editTodos}

            onChangeCheck={onChangeCheck}            
            onDeleteTask={onDeleteTask}
            handleEdit={handleEdit}
            onRestoreTask={onRestoreTask}
          />)
        )}
      </div>

      <div className='indent'></div>
      
      <h2>Завершенные задачи</h2>
      <div className='tasks task__completed'>
        
        {tasksComplited.map((task)=> (
          <Todos
            task={task}
            onChangeCheck={onChangeCheck}  
            onDeleteTask={onDeleteTask}
            onRestoreTask={onRestoreTask}
          />)
        )}
      </div>

      
    </div>
  );
        }


export default App;
