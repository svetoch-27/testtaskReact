import {useState, useEffect, useCallback} from 'react';
import Todos from './Todos';
import axios from 'axios';
import styles from '../../css/TodoCSS.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoList() {
  const apiURL = 'http://185.246.66.84:3000/sarhipenkova/tasks';
  const [list, setList] = useState([]);
  const [error, setError] = useState(''); 
  const apiURLSubTask = 'http://185.246.66.84:3000/sarhipenkova/subtasks';

  function addData() {
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
  }

  useEffect(() => {  
    addData();    
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
        debugger
        // setList(prev => prev.filter(curr => curr.id !== id));
        addData();   
        
      })
      .catch(err => setError(err));
    },[])

  const onRestoreTask = useCallback((task) => {
    const newTask = {
      id: task.id, 
      title: task.title, 
      completed: !task.completed, 
      sequence: task.sequence,}

    axios.put(apiURL+'/'+task.id,newTask)  
      .then(response => {
        // setList(prev => { return [...prev.filter(curr => curr.id !== task.id), response.data]});
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
        // setList(prev => { return [...prev.filter(curr => curr.id !== task.id), response.data]});
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
        // setList(prev => [...prev, response.data]);
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
        // setList(prev => {return [...prev.filter(curr => curr.id !== task.id), response.data]});
      })
      
      .catch(err => setError(err));
    },[])

    // function handleOnDradEnd(result)
    // {console.log(result)}

    // ----------------------------------------------- start    dnd   --------------------------------   
    
  // const [currentTask,setCurrentTask] = useState(null);   

  // const dragStartHandler= (e, task) => {
  //     // e.preventDefault();
  //     console.log('handleOnEdit   id = ' + task.id+'  seq = '+task.sequence);
  //     setCurrentTask(task)
  //   }

  // const dragLeaveHandler= (e) => {
  //     // e.preventDefault();111111111
  //     console.log('dragLeaveHandler+++++++++++++++++++++!!!');
  //   }

  // const dragEndHandler= (e) => {
  //     // e.preventDefault();      
  //     e.target.style.background = 'while';
  //     console.log('dragEndHandler------------------------   END');
  //   }

  // const dragOverHandler= (e) => {
  //     e.preventDefault();
  //     e.target.style.background = 'lightgray';
  //     console.log('dragOverHandler ----------------------   ---');
  //   }

  // const dropHandler= (e, task) => {
  //     e.preventDefault();
  //     setList(list.map(item => {
  //       if (item.id === task.id){
  //       return {...item, sequence: currentTask.sequence}
  //       }
  //       if (item.id === currentTask.id){
  //         return {...item, sequence: task.sequence}
  //       }
  //       return item
  //     }
  //     ))          
  //     e.target.style.background = 'while';
  //     console.log('-----------   dropHandler    id = ' + task.id+'  seq = '+task.sequence);
  //   }

  // const sortTasks = (a, b) => {
  //     if (a.sequence > b.sequence){
  //       return 1
  //     }else{
  //       return -1
  //     }
  //   }

    // ------------------------ end dnd
  
  return (   
    
    <> 
      <h1>Тестовое задание</h1>
      <h2>Активные задачи</h2>
      <div className={styles.center}>
        <button className={styles.classTodo__button} onClick={addTodo}>Добавить задачу</button>
      </div>
      <div className={styles.tasks, styles.task__activ} > 

      {/* <DragDropContext> 
        <Droppable> */}
       {/* onDragEnd={handleOnDradEnd}> */}
        {/* {(provided) =>  */}
              
        {/* {tasksActiv.sort(sortTasks).map((task) => (   */}
              {tasksActiv.map((task) => (  
                <div
                    // draggable={true}                  
                    // onDragStart={(e) => dragStartHandler(e, task)}
                    // onDragLeave={(e) => dragLeaveHandler(e)}
                    // onDragEnd={(e) => dragEndHandler(e)}
                    // onDragOver={(e) => dragOverHandler(e)}
                    // onDrop={(e) => dropHandler(e, task)}                 
                >
                <Todos                  
                  task={task}                  
                  // draggable={true}                  
                  //   onDragStart={(e) => dragStartHandler(e, task)}
                  //   onDragLeave={(e) => dragLeaveHandler(e)}
                  //   onDragEnd={(e) => dragEndHandler(e)}
                  //   onDragOver={(e) => dragOverHandler(e)}
                  //   onDrop={(e) => dropHandler(e, task.sequence)}
                  onChangeCheck={onChangeCheck}            
                  onDeleteTask={onDeleteTask}
                  onHandleEdit={onHandleEdit}
                  onRestoreTask={onRestoreTask}
                />
                </div>
                )
              )}
         {/* } */}
        {/* </Droppable>
      </DragDropContext>  */}
      </div>

      <div className={styles.indent}></div>
      
      <h2>Завершенные задачи</h2>
      {/* <div className={styles.tasks, styles.task__completed}> */}
      <div 
          className={styles.task__completed}        
          draggable={true}>
        
          {tasksComplited.map((task)=> (
            <div  
                className={styles.task__completed}        
                draggable={true}
                    // onDragStart={(e) => dragStartHandler(e, task.sequence)}
                    // onDragLeave={(e) => dragLeaveHandler(e)}
                    // onDragEnd={(e) => dragEndHandler(e)}
                    // onDragOver={(e) => dragOverHandler(e)}
                    // onDrop={(e) => dropHandler(e, task.sequence)}
                    >
            <Todos
              task={task}
              onRestoreTask={onRestoreTask}
            />
            </div>)
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