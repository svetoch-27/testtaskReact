// import TodoList from "./TodoList";
import styles from '../../css/TodoCSS.module.css';
// import axios from 'axios';
// import { useState, useEffect, useContext, memo, useCallback } from 'react';
  
    // function Subtodos({subTask, onHandleEdit, onDeleteTask, onChangeTask, onRestoreTask, onChangeCheck, onChangeTaskName}) {
// function Subtodos({subList}) {
function Subtodos(title) {

  // const [subList, setSubList] = useState([]);  
  // const [error, setError] = useState(''); 
  // const apiURLSubTask = 'http://185.246.66.84:3000/sarhipenkova/subtasks';
  // useEffect(() => {
  //   axios.get(apiURLSubTask).then(res => setSubList(res.data))
  //   .catch(err => setError(err))
  // },[]
  // )
    // if (subList.id === taskId)
      return (    
        <div className={styles.sub_tasks}>
          {title}
          </div>    
        // <div className={styles.classTodo}>
        //   {subList.map(() => (  
        //   <div>
        //     {/* <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task)}></input> */}
        //     <input className={styles.classTodo__taskname} type="text" placeholder={subList.title} id={subList.id} />                  
        //   </div>
        //   ))}
          
        // </div>
        )
      }
  

export default Subtodos;