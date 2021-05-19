import styles from '../../css/TodoCSS.module.css';
// import Subtodos from './Subtodos';
import { useState} from 'react';
import PropTypes from 'prop-types';
  
function Todos({task, onHandleEdit, onDeleteTask, onRestoreTask, onChangeCheck, onChangeTaskName}) {
    
  const [editValue, setEditValue] = useState(task.title);
  const [onEdit, setOnEdit] = useState(false);       
        
  const onHandleSave =(task) =>{
    setOnEdit(false)
    onHandleEdit(editValue, task)
    if(editValue) {
      onHandleEdit(editValue, task)            
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
          <div className={styles.style_row}>
            <div className={styles.out_input}>
              <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task)}></input>
              <input className={styles.classTodo__taskname} type="text" placeholder={editValue} value = {editValue} onChange={e => setEditValue(e.target.value)}/> 
              
              </div>
            <div className={styles.out_button}>        
              {task.completed && <button className={styles.classTodo__button} onClick={() => {onHandleSave(task)}} >Сохранить</button>}      
              {task.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(task.id)}>Удалить</button>}               
              {!task.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(task)}>Восстановить</button>}
              </div>
          </div>     
          <div className={styles.out_subtasks}>    
            {task.subTasks.map(item => console.log(item.title))}
            {task.subTasks.map(item => 
              <div className={styles.subtask}><p>{item.title}</p></div>)}
            </div>
                        
          </div>
           )
      }else{
      return (        
        // <div className={styles.classTodo, styles.style_column}>
        <div className={styles.classTodo}>
          <div className={styles.style_row}>
            <div className={styles.out_input}>
              <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task)}></input>
              <input className={styles.classTodo__taskname} type="text" placeholder={task.title} id={task.id} value = {editValue} onChange={onChangeTaskName}/>                  
            </div>
            <div className={styles.out_button}> 
              {task.completed && <button className={styles.classTodo__button} onClick={handleOnEdit} >Редактировать</button>}                    
              {task.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(task.id)}>Удалить</button>}               
              {!task.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(task)}>Восстановить</button>}
            </div>
          </div>     
          <div className={styles.out_subtasks}>    
            {/* {task.subTasks.map(item => console.log(item.title))} */}
            {task.subTasks.map(item => 
              <div className={styles.subtask}>
                <p>{item.title}</p>
              </div>)}
            </div>
          
        </div>
        )
      }
  }

  Todos.propTypes = {
    task: PropTypes.arrayOf(PropTypes.object),
  onHandleEdit: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onRestoreTask: PropTypes.func,
  onChangeCheck: PropTypes.func,
  onChangeTaskName: PropTypes.func,
}

// Todos.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.shspe(shapeTypes {
//     title: PropTypes.string,
//     completed: PropTypes.bool
//   })),
// }



// Todos.defaultProps = {
//   items: [],
  // onItemClick: () => {
  // },
  // onItemDoubleClick: () => {
  // },
// }

export default Todos;