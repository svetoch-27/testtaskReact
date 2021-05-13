// import TodoList from "./TodoList";
import styles from '../../css/TodoCSS.css';
// import {nanoid} from 'nanoid';
// import Button from "./Button";
// import { useState, useEffect, useContext, memo, useCallback } from 'react';
// import AppContext from "../../appContext";

// const defaultTodos = [
//   {    id: nanoid(),    title:'Задача 1',    completed: false,  },
//   {    id: nanoid(),    title:'Задача 2',    completed: false,  },
//   {    id: nanoid(),    title:'Задача 3',    completed: false,  },
//   {    id: nanoid(),    title:'Задача 4',    completed: true,  },
// ];


// const addTodo = () => {
//   alert('Мы пока не умеем добавлять');
// }

// function Todos(props) {
//   return (
//     <div className='classTodo'>
//            {/* onDoubleClick={() => onDoubleClick(id)} */}
//            <input type='checkbox' checked={true}></input>
//            <div>{props.name}</div>
//            <button>Редактировать</button>
//            <button>Удалить</button>
//     </div>

function Todos(props) {
  return (
    <div className='classTodo'>
           {/* onDoubleClick={() => onDoubleClick(id)} */}
           <div>
              <input type='checkbox' checked={props.activ}></input>
              <div>{props.name}</div>
           </div>

           <div>
              {/* {props.showonChangeTask && <button onClick={props.onChangeTask}>Редактировать</button>} */}
              {props.completed && <button onClick={props.onChangeTask}>Редактировать</button>} 
              {props.completed && <button onClick={props.onDeleteTask}>Удалить</button>}
              {!props.completed && <button onClick={props.onRestoreTask}>Восстановить</button>}
           </div>

    </div>
   
    // <div className={styles.todos}>
    //   <div>
    //     <div className={styles.btnContainer}>
    //       <Button text="Добавить" onClick={addTodo}/>
    //     </div>
    //     <TodoList items={defaultTodos}/>
    //   </div>
    // </div>
  );
  }

export default Todos;