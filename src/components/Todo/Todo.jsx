import styles from '../../css/TodoCSS.module.css';
// import Subtodos from './Subtodos';
import { useState} from 'react';
import PropTypes from 'prop-types';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Subtodos from './Subtodos';

  
function Todos({task, onHandleEdit, onDeleteTask, onRestoreTask, onChangeCheck, onChangeTaskName}) {
    
  const [editValue, setEditValue] = useState(task.title);
  const [onEdit, setOnEdit] = useState(false);      
  let subTasksLength = 0; 
        
  const onHandleSave =(task) =>{
    setOnEdit(false)
    onHandleEdit(editValue, task)
    if(editValue) {
      onHandleEdit(editValue, task)            
      } else {
        setEditValue(task.title)
        }
    }

    const handleOnEdit = (e) => {
      setOnEdit(true);
      e.preventDefault();
      console.log('handleOnEdit');
    }


    console.log('  Array.isArray(task.subTasks)  ===========  '+Array.isArray(task.subTasks));
    
// debugger
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
          {/* {if (Array.isArray(task.subTasks)){
          {subTasksLength = task.subTasks.length;} --------------------------- !!!*/}
          {Array.isArray(task.subTasks) && (
            <div className={styles.out_subtasks}>    
            {/* {task.subTasks.map(item => console.log(item.title))} */}
            {task.subTasks.map((subtask) => (
              <Subtodos 
                key={subtask.id}
                subtask={subtask} 
                onHandleEdit={onHandleEdit}
                onChangeTaskName={onChangeTaskName}
                onChangeCheck={onChangeCheck}/>
              // <div className={styles.subtask}>
              //   <p>{item.title}</p>
              // </div>
              ))
            }
            </div> 
            // <div className={styles.out_subtasks}>    
            //   {task.subTasks.map(item => console.log(item.title))}
            //   {task.subTasks.map(item => 
            //     // <Subtodos 
            //     //   key={item.id}
            //     //   title={item.title} />
            //     <div className={styles.subtask}><p>{item.title}</p></div>)}
            // </div>
            )}
                        
          </div>
           )
      }else{
        if (Array.isArray(task.subTasks)){
          subTasksLength = task.subTasks.length;
        }
        if (subTasksLength !== 0 ) {
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
              {/* <div className={styles.out_subtasks}>     */}
              {Array.isArray(task.subTasks) && (
            <div className={styles.out_subtasks}>    
            {/* {task.subTasks.map(item => console.log(item.title))} */}
            {task.subTasks.map((subtask) => (
              <Subtodos 
                key={subtask.id}
                subtask={subtask} 
                onHandleEdit={onHandleEdit}
                onChangeTaskName={onChangeTaskName}
                onChangeCheck={onChangeCheck}/>
              ))
            }
            </div> 
            // <div className={styles.out_subtasks}>    
            //   {task.subTasks.map(item => console.log(item.title))}
            //   {task.subTasks.map(item => 
            //     // <Subtodos 
            //     //   key={item.id}
            //     //   title={item.title} />
            //     <div className={styles.subtask}><p>{item.title}</p></div>)}
            // </div>
            )}
                {/* {task.subTasks.map(item => console.log(item.title))} */}
                {/* {task.subTasks.map((subtask) => (
              <Subtodos 
                key={subtask.id}
                subtask={subtask} 
                onHandleEdit={onHandleEdit}
                onChangeTaskName={onChangeTaskName}
                onChangeCheck={onChangeCheck}/>
                  // <div className={styles.subtask}>
                  //   <p>{item.title}</p>
                  // </div>
                  ))
                } */}
                {/* </div>           */}
            </div>
            )
            }else{
              return (        
                // <div className={styles.classTodo, styles.style_column}>
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
                      <input className={styles.classTodo__checkbox} type='checkbox' disabled={!task.completed} defaultChecked={!task.completed} onChange={() => onChangeCheck(task)}></input>
                      <input className={styles.classTodo__taskname} type="text" placeholder={task.title} id={task.id} value = {editValue} onChange={onChangeTaskName}/>                  
                    </div>
                    <div className={styles.out_button}> 
                      {task.completed && <button className={styles.classTodo__button} onClick={handleOnEdit} >Редактировать</button>}                    
                      {task.completed && <button className={styles.classTodo__button} onClick={() => onDeleteTask(task.id)}>Удалить</button>}               
                      {!task.completed && <button className={styles.classTodo__button} onClick={() => onRestoreTask(task)}>Восстановить</button>}
                    </div>
                  </div>    
                </div>
                )
            }
        
      }
  }

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


// Todos.defaultProps = {
//   items: [],
  // onItemClick: () => {
  // },
  // onItemDoubleClick: () => {
  // },
// }

export default Todos;