import {useState, useEffect, useCallback, memo} from 'react';
import Todos from './Todos';
import axios from 'axios';
import styles from '../../css/TodoCSS.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = memo(() => { 
  const apiURL = 'http://185.246.66.84:3000/sarhipenkova/tasks';
  const [list, setList] = useState([]);
  const [error, setError] = useState(''); 
  const apiURLSubTask = 'http://185.246.66.84:3000/sarhipenkova/subtasks';

// получить данные задачи и подзадачи -------------------------------------------------------
  // function addData() {
    const addData = useCallback(() => {
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
      // debugger
      setList(myList)
    })
    .catch(err => setError(err))
  }
  ,[list,setList])

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

  // удаление задачи или подзадачи ------------------------------------------------------------------------
  const onDeleteTask = useCallback((id, type) => {
    // debugger
    let api;
    if(type === 'task'){api = apiURL;}else{api = apiURLSubTask;}
    console.log('--------   onDeleteTask   ------------ type = '+type+ '   api = '+ api)
    // const api = (type==='task')?apiURL:apiURLSubTask;
      axios.delete(api+'/'+id)
      .then(response => {
        // debugger
        // setList(prev => prev.filter(curr => curr.id !== id));
        addData();   
        
      })
      .catch(err => setError(err));
    },[])

    //востановить задачу -----------------------------------------------------------------------------------
  const onRestoreTask = useCallback((task,type) => {
    // debugger
    const newTask = (type === 'task')?
    {
      id: task.id, 
      title: task.title, 
      completed: !task.completed, 
      subTasks: task.subTasks,
      sequence: task.sequence,}:{
        id: task.id, 
        taskId: task.taskId,
        title: task.title, 
        completed: !task.completed, 
        sequence: task.sequence,};
    // const newTask = {
    //   id: task.id, 
    //   taskId: task.taskId,
    //   title: task.title, 
    //   completed: !task.completed, 
    //   sequence: task.sequence,}
    
    const api = (type === 'task')?apiURL:apiURLSubTask;
    axios.put(api+'/'+task.id,newTask)  
      .then(response => {
        // setList(prev => { return [...prev.filter(curr => curr.id !== task.id), response.data]});        
        addData();   
      })
      .catch(err => setError(err));
    },[setList])

    //Пометит как завершенную задачачу или восстановить --------------------------------------------------
  const onChangeCheck = useCallback((task, type) => {
    const api = (type === 'task')?apiURL:apiURLSubTask;

    const newTask = (type === 'task')?
     {id: task.id, 
      title: task.title, 
      completed: !task.completed, 
      sequence: task.sequence,}
      :{id: task.id, 
        title: task.title, 
        completed: !task.completed,
        taskId: task.taskId,
        sequence: task.sequence,};
    

    axios.put(api+'/'+task.id,newTask)  
      .then(response => {
        // setList(prev => { return [...prev.filter(curr => curr.id !== task.id), response.data]});
        addData();   
      })
      .catch(err => setError(err));
    },[setList])

  //добавить подзадачу ---------------------------------------------------------------------------------
  const addSubtask = useCallback((taskId) => {

    function newSequenceTask() {
        return 10; 
      }
      // debugger 
  
    const newTask = {title: 'Новая задача', completed: true, taskId: taskId, sequence: newSequenceTask(), }      
    axios.post(apiURLSubTask,newTask)  
        .then(response => {
          setList(prev => [...prev, response.data]);
          // addData();   
        })
        .catch(err => setError(err));},[setList])
  
    

  //добавить задачу -----------------------------------------------------------------------
  const addTodo = useCallback((tasks) => {

    
    console.log('==================   addTodo   =========================');
    console.log(tasks);

    function newSequenceTask(partasks) {
      const par1 = ((partasks === undefined) || (partasks.length === 0))?1:partasks.length+1;
      return par1;
    }
    const newTask = {title: 'Новая задача', completed: true, sequence: newSequenceTask(tasks), }
    
    axios.post(apiURL,newTask)  
      .then(response => {
        setList(prev => [...prev, response.data]);
        // addData();   
      })
      .catch(err => setError(err));},[setList])

      // Редактиование -------------------------------------------------------------------------
  const onHandleEdit = useCallback((editValue, task, type) => {
    // debugger
    const api = (type === 'task')?apiURL:apiURLSubTask;
    const newTask = (type === 'task')?
     {id: task.id, 
      title: editValue, 
      completed: task.completed,
      sequence: task.sequence,}
      :{id: task.id, 
        title: editValue, 
        completed: task.completed,
        taskId: task.taskId,
        sequence: task.sequence,};

    axios.put(api+'/'+task.id,newTask)  
    
      .then(response => {
        // setList(prev => {return [...prev.filter(curr => curr.id !== task.id), response.data]});
        addData();   
      })
      
      .catch(err => setError(err));
    },[])

    // function handleOnDradEnd(result)
    // {console.log(result)}

    // ----------------------------------------------- start    dnd   --------------------------------   
    
  const [currentTask,setCurrentTask] = useState([]);   
  const [currentIdTask,setCurrentIdTask] = useState();   
  const [currentSeqTask,setCurrentSeqTask] = useState();   

  const dragStartHandler= (e, task) => {
      // e.preventDefault();
      console.log('dragStartHandler from  id = ' + task.id+'  seq = '+task.sequence);
      setCurrentTask(task);

      console.log('--- task --- ');
      console.log('task.id = '+task.id);
      console.log('task.seq = '+task.sequence);

      console.log('--- setCurrentTask --- ');
      console.log('setCurrentTask.id = '+currentTask.id);
      console.log('setCurrentTask.seq = '+currentTask.sequence);
      
      console.log('--- --- --- ');
      setCurrentIdTask(task.id);
      setCurrentSeqTask(task.sequence);      
      // console.log('dragStartHandler setCurrentTask  id = ' + currentTask.id+'  seq = '+currentTask.sequence);
      console.log('task = '+task);
      console.log('currentTask = '+currentTask);
      console.log('currentIdTask = '+currentIdTask);
      console.log('currentSeqTask = '+currentSeqTask);

      // setCurrentIdTask()
      //запись по ссылке
    }

  const dragLeaveHandler= (e) => {
      // e.preventDefault();111111111
      console.log('dragLeaveHandler+++++++++++++++++++++!!!');
    }

  const dragEndHandler= (e) => {
      // e.preventDefault();      
      e.target.style.background = 'while';
      console.log('dragEndHandler------------------------   END');
    }

  const dragOverHandler= (e) => {
      e.preventDefault();
      e.target.style.background = 'lightgray';
      console.log('dragOverHandler ----------------------   ---');
    }

  const dropHandler= (e, task) => {
      e.preventDefault();
      
      console.log('---   dropHandler    id = ' + task.id+'  seq = '+task.sequence);  

      setList(list.map(item => {
        if (item.id === task.id){
        return {...item, sequence: currentTask.sequence}
        }
        if (item.id === currentTask.id){
          return {...item, sequence: task.sequence}
        }
        return item
      }
      ))          
      e.target.style.background = 'while';
      console.log('--- cur.seq   от куда    id = ' + currentTask.id+'  seq = '+currentTask.sequence);
      console.log('--- task   куда    id = ' + task.id+'  seq = '+task.sequence);

      // setList(list.map(item => {console.log('---  id = '+item.id+'   seq = '+item.sequence)}));
      //запись по ссылке
      //откуда
      const parFrom = {
        id: currentTask.id, 
        title: currentTask.title, 
        completed: !currentTask.completed, 
        subTasks: currentTask.subTasks,
        sequence: task.sequence,};

      onRestoreTask(parFrom,'task');
        // куда
      const parIn = {
        id: task.id, 
        title: task.title, 
        completed: !task.completed, 
        subTasks: task.subTasks,
        sequence: currentTask.sequence,};

      onRestoreTask(parIn,'task');

      console.log('--- parFrom = ' + parFrom);
      console.log('--- parIn = ' + parIn);
      // debugger

    }

  const sortTasks = (a, b) => {
      if (a.sequence > b.sequence){
        return 1
      }else{
        return -1
      }
    }

    // ------------------------ end dnd
  // debugger

  console.log('----=========================-----------  ');
  console.log('--- cur.seq   от куда    id = ' + currentTask.id+'  seq = '+currentTask.sequence);
  console.log(list);
  // console.log('--- task   куда    id = ' + task.id+'  seq = '+task.sequence);

  return (   
    
    <> 
      <h1>Тестовое задание</h1>
      <h2>Активные задачи</h2>
      <div className={styles.center}>
        <button className={styles.classTodo__button} onClick={() => {addTodo(list)}}>Добавить задачу</button>
      </div>
      {/* <div className={styles.tasks, styles.task__activ} >  */}
      <div className={styles.task__activ}> 

      {/* <DragDropContext> 
        <Droppable> */}
       {/* onDragEnd={handleOnDradEnd}> */}
        {/* {(provided) =>  */}
              
        {/* {tasksActiv.sort(sortTasks).map((task) => (   */}
              {tasksActiv.sort(sortTasks).map((task) => (  
                <div
                    draggable={true}                  
                    onDragStart={(e) => dragStartHandler(e, task)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropHandler(e, task)}                 
                >
                  <Todos     
                    key={task.id}             
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
                    addSubtask={addSubtask}
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
              key={task.id} 
              task={task}
              onRestoreTask={onRestoreTask}
            />
            </div>)
          )}
      </div>   
      <div className={styles.footer}></div>   
    </>
    
  );
         


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
})

export default TodoList;
