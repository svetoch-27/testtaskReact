import styles from '../../css/TodoCSS.module.css';
import { useState, memo} from 'react';
import PropTypes from 'prop-types';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Subtodos from './Subtodos';

  
// function Todos({task, onHandleEdit, onDeleteTask, onRestoreTask, onChangeCheck, onChangeTaskName, addSubtask}) {
const Todos = memo(({task, onHandleEdit, onDeleteTask, onRestoreTask, onChangeCheck, onChangeTaskName, addSubtask}) => {
  const [editValue, setEditValue] = useState(task.title);
  const [onEdit, setOnEdit] = useState(false);      
  let subTasksLength = 0; 
  const parTypeTask = 'task';
        
  const onHandleSave =(task) =>{
    setOnEdit(false)
    onHandleEdit(editValue, task, parTypeTask)
    if(editValue) {
      onHandleEdit(editValue, task, parTypeTask)            
      } else {
        setEditValue(task.title)
        }
    }

    const handleOnEdit = (e) => {
      setOnEdit(true);
      e.preventDefault();
      console.log('handleOnEdit');
    }


    // console.log('  Array.isArray(task.subTasks)  ===========  '+Array.isArray(task.subTasks));
    
// debugger
    if (onEdit){ 
      return (
        <div className={styles.classTodo}>
          <div className={styles.style_row}>
            <div className={styles.out_input}>
              <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task, parTypeTask)}></input>
              <input className={styles.classTodo__taskname} type="text" placeholder={editValue} value = {editValue} onChange={e => setEditValue(e.target.value)}/> 
              
            </div>
            <div className={styles.out_button}>        
              {task.completed && <button className={styles.classTodo__button} onClick={() => {onHandleSave(task)}} >Сохранить</button>}      
              {task.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(task.id, parTypeTask)}>Удалить</button>}               
              {!task.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(task, parTypeTask)}>Восстановить</button>}
              </div>
          </div>     
          {Array.isArray(task.subTasks) && (
            <div className={styles.out_subtasks}>    
            {task.subTasks.map((subtask) => (
              <Subtodos 
                key={subtask.id}
                subtask={subtask} 
                onHandleEdit={onHandleEdit}
                onChangeTaskName={onChangeTaskName}                
                onDeleteTask={onDeleteTask}
                onChangeCheck={onChangeCheck}/>
              ))
            }
            </div> 
            )}
                        
          </div>
           )
      }else{
        if (Array.isArray(task.subTasks)){
          subTasksLength = task.subTasks.length;
        }
        if (subTasksLength !== 0 ) {
          return (        
            <div className={styles.classTodo}>
              <div className={styles.style_row}>
                <div className={styles.out_input}>
                  <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task, parTypeTask)}></input>
                  <input className={styles.classTodo__taskname} type="text" placeholder={task.title} id={task.id} value = {editValue} onChange={onChangeTaskName}/>                  
                </div>
                <div className={styles.out_button}> 
                  {task.completed && <button className={styles.classTodo__button} onClick={() => addSubtask(task.id)} >Добавить подзадачу</button>}
                  {/* {task.completed && <button className={styles.classTodo__button} onClick={addSubtask}>Добавить подзадачу</button>}                   */}
                  {/* {task.completed && <button className={styles.classTodo__button}>Добавить подзадачу</button>} */}
                  {task.completed && <button className={styles.classTodo__button} onClick={handleOnEdit} >Редактировать</button>}                  
                  {task.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(task.id, parTypeTask)}>Удалить</button>}               
                  {!task.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(task, parTypeTask)}>Восстановить</button>}
                </div>
              </div>     
              {Array.isArray(task.subTasks) && (
            <div className={styles.out_subtasks}>    
            {task.subTasks.map((subtask) => (
              <Subtodos 
                key={subtask.id}
                subtask={subtask} 
                onHandleEdit={onHandleEdit}
                onChangeTaskName={onChangeTaskName}              
                onDeleteTask={onDeleteTask}
                onChangeCheck={onChangeCheck}/>
              ))
            }
            </div> 
            )}
            </div>
            )
            }else{
              return (        
                <div 
                    className={styles.classTodo} 
                    // draggable={true}
                    // onDragStart={(e) => dragStartHandler(e, task.sequence)}
                    // onDragLeave={(e) => dragLeaveHandler(e)}
                    // onDragEnd={(e) => dragEndHandler(e)}
                    // onDragOver={(e) => dragOverHandler(e)}
                    // onDrop={(e) => dropHandler(e, task.sequence)}
                    >
                  <div className={styles.style_row}>
                    <div className={styles.out_input}>
                      <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task, parTypeTask)}></input>
                      <input className={styles.classTodo__taskname} type="text" placeholder={task.title} id={task.id} value = {editValue} onChange={onChangeTaskName}/>                  
                    </div>
                    <div className={styles.out_button}> 
                      {task.completed && <button className={styles.classTodo__button} onClick={handleOnEdit} >Редактировать</button>}                    
                      {task.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(task.id, parTypeTask)}>Удалить</button>}               
                      {!task.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(task, parTypeTask)}>Восстановить</button>}
                    </div>
                  </div>    
                </div>
                )
            }
        
      }
  })

  Todos.propTypes = {
    // task: PropTypes.arrayOf(PropTypes.object),
    task: PropTypes.arrayOf({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      sequence: PropTypes.number,
    }),
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