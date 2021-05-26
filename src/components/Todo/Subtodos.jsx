// import TodoList from "./TodoList";
import styles from '../../css/TodoCSS.module.css';
// import axios from 'axios';
import { useState} from 'react';
function Subtodos({subtask,onChangeCheck, onHandleEdit, onDeleteTask,onRestoreTask}) {
  // debugger
  // console.log('Subtodos   subtask = '+subtask);
  // console.log('Subtodos   id = '+subtask.id);
  // console.log('Subtodos   sequence = '+subtask.sequence);
  // console.log('Subtodos   taskId = '+subtask.taskId);
  // console.log('Subtodos   title = '+subtask.title);
  // console.log('Subtodos   completed = '+subtask.completed);

  const [editValue, setEditValue] = useState(subtask.title); 
  const [onEdit, setOnEdit] = useState(false);      
  let subTasksLength = 0; 
  
  const parTypeTask = 'subTask';

  
  // console.log('--------   function Subtodos   ------------ parTypeTask = '+parTypeTask+ '   subtask.id = '+ subtask.id)
        
  const onHandleSave =(subtask) =>{
    setOnEdit(false)
    onHandleEdit(editValue, subtask, parTypeTask)
    if(editValue) {
      onHandleEdit(editValue, subtask, parTypeTask)            
      } else {
        setEditValue(subtask.title)
        }
    }

    const handleOnEdit = (e) => {
      setOnEdit(true);
      e.preventDefault();
      console.log('handleOnEdit');
    }
  
    // debugger

    
      return (    
        <div className={styles.sub_tasks}>
          <div className={styles.out_input}>                 
              {/* <input className={styles.classTodo__checkbox} type='checkbox' disabled={!subtask.completed} defaultChecked={!subtask.completed} onChange={() => onChangeCheck(subtask)}></input> */}
              <input className={styles.classTodo__checkbox} type='checkbox' disabled={!subtask.completed} defaultChecked={!subtask.completed}></input>
              <input className={styles.classTodo__taskname} type="text" placeholder={subtask.title} id={subtask.id} value = {editValue}/>
          </div>
          <div className={styles.out_button}>        
              {onEdit && subtask.completed && <button className={styles.classTodo__button} onClick={() => {onHandleSave(subtask)}} >Сохранить</button>}  
              {!onEdit &&  subtask.completed && <button className={styles.classTodo__button} onClick={handleOnEdit} >Редактировать</button>}                    
                  
              {/* {subtask.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(subtask.id, parTypeTask)}>Удалить</button>}   */}
              {subtask.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(subtask.id, parTypeTask)}>Удалить</button>}                
              {!subtask.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(subtask, parTypeTask)}>Восстановить</button>}
          </div>
          
        </div>    
        
        )
      }  

export default Subtodos;