// import TodoList from "./TodoList";
import styles from '../../css/TodoCSS.css';
// import {nanoid} from 'nanoid';
import { useState, useEffect, useContext, memo, useCallback } from 'react';


  
    function Todos({task, sequence, completed, editTodos , handleEdit, onDeleteTask, onChangeTask, onRestoreTask, onChangeCheck, onChangeTaskName}) {
    
        const [editValue, setEditValue] = useState(task.title);
        const [onEdit, setOnEdit] = useState(false);
        
        const handleSave =() =>{
          setOnEdit(false)
          if(editValue) {
            handleEdit(editValue, task.id)
          } else {
            setEditValue(task.title)
          }
        }

    const handleOnEdit = () => {
      setOnEdit(true)
    }

    if (onEdit){
      return (
        <div className={styles.classTodo}>
           <div>
              <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task)}></input>
              <input type="text" placeholder={editValue} value = {editValue} onChange={e => setEditValue(e.target.value.toLowerCase())}/> 
              {/* <input type ="text" value = {editValue} onChange ={e => setEditValue(e.target.value)}/>                  */}
           </div>
           <div>        
              {task.completed && <button onClick={() => {handleSave(task.id)}} >Сохранить</button>}      
              {task.completed && <button onClick={() => onDeleteTask(task.id)}>Удалить</button>}               
              {!task.completed && <button onClick={() => onRestoreTask(task)}>Восстановить</button>}
           </div>
          </div>
           )
      }else{
      return (        
        <div className={styles.classTodo}>
          <div>
            <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task)}></input>
            <input type="text" placeholder={task.title} id={task.id} value = {editValue} onChange={onChangeTaskName}/>                  
          </div>
          <div>              
            {/* {task.completed && <button onClick={() => editTodo(editValue, task.id)} >Редактировать</button>}                */}
            {task.completed && <button onClick={handleOnEdit} >Редактировать</button>}                    
            {task.completed && <button onClick={() => onDeleteTask(task.id)}>Удалить</button>}               
            {!task.completed && <button onClick={() => onRestoreTask(task)}>Восстановить</button>}
          </div>
        </div>
        )
      }
  }

export default Todos;