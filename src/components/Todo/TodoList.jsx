import {useState, useEffect, useCallback} from 'react';
import Todos from './Todos';
import axios from 'axios';
import styles from '../../css/TodoCSS.module.css';

function TodoList() {
  const apiURL = 'http://185.246.66.84:3000/sarhipenkova/tasks';
  const [list, setList] = useState([]);
  const [error, setError] = useState(''); 
  const apiURLSubTask = 'http://185.246.66.84:3000/sarhipenkova/subtasks';

  // function addData() {
  useEffect(() => {
    axios
    .get(apiURL)
    .then(async res => { 
      const parList = res.data;
      const myList = await Promise.all(
        parList.map(async item => {
          // const subTasks = await (await axios.get(apiURLSubTask+'?taskId='+item.id).data).data          
          const subTasks =  (await axios.get(apiURLSubTask+'?taskId='+item.id)).data
          return {
              ...item,
              subTasks,
          }
        })
      )
      setList(myList)
    })
    .catch(err => setError(err))
  },[] 
  )  

  // useEffect(() => {
  //   axios.get(apiURLSubTask).then(res => setSubList(res.data))
  //   .catch(err => setError(err))
  // },[]
  // )

  const tasksActiv = list.filter(task => task.completed);
  const tasksComplited = list.filter(task => !task.completed);

  const onDeleteTask = useCallback((id) => {
    axios.delete(apiURL+'/'+id)  
      .then(response => {
        setList(prev => prev.filter(curr => curr.id !== id));
      })
      .catch(err => setError(err));
    },[setList])

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

  const addTodo = useCallback(() => {

    function newSequenceTask() {
      return 10;
    }

    const newTask = {title: 'Новая задача', completed: true, sequence: newSequenceTask(), }
    
    axios.post(apiURL,newTask)  
      .then(response => {
        setList(prev => [...prev, response.data]);
      })
      .catch(err => setError(err));},[setList])

  const onHandleEdit = useCallback((editValue, task) => {

    const newTask = {
      id: task.id, 
      title: editValue, 
      completed: task.completed, 
      sequence: task.sequence,}
    axios.put(apiURL+'/'+task.id,newTask)  
    
      .then(response => {
        setList(prev => {return [...prev.filter(curr => curr.id !== task.id), response.data]});
      })
      
      .catch(err => setError(err));
    },[])
  
  return (    
    <> 
      <h1>Тестовое задание</h1>
      <h2>Активные задачи</h2>
      <div className={styles.center}>
        <button className={styles.classTodo__button} onClick={addTodo}>Добавить задачу</button>
      </div>
      <div className={styles.tasks, styles.task__activ}>  
        {tasksActiv.map((task) => (  
          <Todos
            task={task}
            onChangeCheck={onChangeCheck}            
            onDeleteTask={onDeleteTask}
            onHandleEdit={onHandleEdit}
            onRestoreTask={onRestoreTask}
          />
          )
        )}
      </div>

      <div className={styles.indent}></div>
      
      <h2>Завершенные задачи</h2>
      {/* <div className={styles.tasks, styles.task__completed}> */}
      <div className={styles.task__completed}>
        
        {tasksComplited.map((task)=> (
          <Todos
            task={task}
            onRestoreTask={onRestoreTask}
          />)
        )}
      </div>   
      <div className={styles.footer}></div>   
    </>
  );
        }


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