import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
// import styles from '../../css/TodoCSS.css';
import {useState, useEffect, useCallback} from 'react';
import Todos from './Todos';
import axios from 'axios'
// import styles from '../css/TodoCSS.css';
import {nanoid} from 'nanoid';


function TodoList() {

  // return <div className={styles.list}>{items.map(item => <TodoItem key={item.id} data={item}/>)}</div>;

  const apiURL = 'http://185.246.66.84:3000/sarhipenkova/tasks';

  const [list, setList] = useState([]);
  const [error, setError] = useState(''); 
  // const [changeTask, setChangeTask] = useState({id: 1, title: 'NewTask', change: 'true'}); 

  useEffect(() => {
    axios.get(apiURL).then(res => setList(res.data))
    .catch(err => setError(err))
  },[]
  )

  const defaultTodos = list;
  const tasksActiv = defaultTodos.filter(task => task.completed);
  const tasksComplited = defaultTodos.filter(task => !task.completed);

  // function onDeleteTask(id) {
  //   setList(list.filter(item => item.id !== id));
  // }

  const onDeleteTask = useCallback((id) => {
    axios.delete(apiURL+'/'+id)  
      .then(response => {
        setList(prev => prev.filter(curr => curr.id !== id));
      })
      .catch(err => setError(err));
    },[setList])

  // function onRestoreTask(tasks) {
  //       console.log('==================  onRestoreTask  ==========================');
  //       console.log(tasks.id);
  //           tasks.completed = !tasks.completed;
  //           setList(prev => {return[ ...prev.filter(curr => curr.id !== tasks.id), tasks]});         
  // }

  const onRestoreTask = useCallback((task) => {
    const newTask = {
      id: task.id, 
      title: task.title, 
      completed: !task.completed, 
      sequence: task.sequence,}

    axios.put(apiURL+'/'+task.id,newTask)  
      .then(response => {
        setList(prev => { return [...prev.filter(curr => curr.id !== task.id), response.data]});
      })
      .catch(err => setError(err));
    },[setList])
  
  // function onChangeCheck(tasks) {   
  //       console.log('==================  onChangeCheck  ==========================');
  //       console.log(tasks.id); 
  //       tasks.completed = !tasks.completed;
  //       setList(prev => {return[ ...prev.filter(curr => curr.id !== tasks.id), tasks]});
  // }

  const onChangeCheck = useCallback((task) => {
    const newTask = {
      id: task.id, 
      title: task.title, 
      completed: !task.completed, 
      sequence: task.sequence,}

    axios.put(apiURL+'/'+task.id,newTask)  
      .then(response => {
        setList(prev => { return [...prev.filter(curr => curr.id !== task.id), response.data]});
      })
      .catch(err => setError(err));
    },[setList])
   

  // function addTodo() {
  //   setList( prev =>
  //     [...prev,
  //       { id: nanoid(), title: 'Новая задача', completed: true, sequence:1, }
  //     ]    );  }

  function newSequenceTask() {
    return 1;  
  }

  const addTodo = useCallback(() => {
    const newTask = {title: 'Новая задача', completed: true, sequence: newSequenceTask(), }
    axios.post(apiURL,newTask)  
      .then(response => {
        setList(prev => [...prev, response.data]);
      })
      .catch(err => setError(err));},[setList])

    
  // const editTodos = (editValue, id) =>{
  //   // editTodos
  //       const newTodos = [...list]
  //       newTodos.forEach((todo) => {
  //         if(todo.id === id)
  //         todo.title = editValue
  //         console.log(newTodos)
  //       })
  //       setList(newTodos)
  // }


  const onHandleEdit = useCallback((editValue, task) => {

    const newTask = {
      id: task.id, 
      title: editValue, 
      completed: task.completed, 
      sequence: task.sequence,}
      debugger
    axios.put(apiURL+'/'+task.id,newTask)  
    
      .then(response => {
        setList(prev => {return [...prev.filter(curr => curr.id !== task.id), response.data]});
      })
      
      .catch(err => setError(err));
    },[])


  //   setList(prev => {
  //     return[
  //       ...prev.filter(curr => curr.id !== task.id),{}        
  //     ]
  //   })
  // } 


  // const onHandleEdit = (editValue, task) => {
  //   setList(prev => {
  //     return[
  //       ...prev.filter(curr => curr.id !== task.id),
  //       {
  //         id: task.id, 
  //         title: editValue, 
  //         completed: task.completed, 
  //         sequence: task.sequence, 
  //       }
  //     ]
  //   })
  // } 

  return (    
    <>
      <h1>Тестовое задание</h1>
      <h2>Активные задачи</h2>
      <button onClick={addTodo}>Добавить задачу</button>

      <div className='tasks task__activ'>
        {tasksActiv.map((task) => (          
          <Todos
            task={task}
            // editTodos={editTodos}

            onChangeCheck={onChangeCheck}            
            onDeleteTask={onDeleteTask}
            onHandleEdit={onHandleEdit}
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
            // onChangeCheck={onChangeCheck}  
            // onDeleteTask={onDeleteTask}
            onRestoreTask={onRestoreTask}
          />)
        )}
      </div>      
    </>
  );
        }


//  const TodoList = ({//items, onItemClick, onItemDoubleClick}) => {

//   return (<div className={styles.list}>
//       {items.map(item => (
//         <TodoItem
//           key={item.id}
//           onClick={onItemClick}
//           onDoubleClick={onItemDoubleClick}
//           data={item}
//         />)
//       )}
//     </div>
//   );
// };

// TodoList.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.object),
  // onItemClick: PropTypes.func,
  // onItemDoubleClick: PropTypes.func,
// }

// TodoList.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.shspe(shapeTypes {
//     title: PropTypes.string,
//     completed: PropTypes.bool
//   })),
// }



// TodoList.defaultProps = {
//   items: [],
  // onItemClick: () => {
  // },
  // onItemDoubleClick: () => {
  // },
// }

export default TodoList;