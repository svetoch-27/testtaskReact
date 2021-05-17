// import styles from '../../css/Todo.module.css';
import cn from 'classnames';
// import PropTypes from 'prop-types';
// import { useEffect, memo } from 'react';


function TodoItem({data, onClick}){
  const {title, completed} = data; 
  return (
       <div onClick = {onClick}>1
         {/* <div className={cn(styles.item, {[styles.completed]: completed})} onClick = {onClick}>
            {/* onDoubleClick={() => onDoubleClick(id)} */}
           {/* <div>{title}</div>  */}
        </div>
  );
}
 {/* const TodoItem = memo(({data, onClick, onDoubleClick}) => {
  const {title, completed, id} = data;

  useEffect(() => {
    console.log('component mount');
    return () => {
      console.log('component unmount');
    }
  })

  return (
    <div
      className={cn(styles.item, {[styles.completed]: completed})}
      onClick={() => onClick(id)}
      onDoubleClick={() => onDoubleClick(id)}>
      <div>{title}</div>
    </div>
  );
})

TodoItem.displayName = 'TodoItem';

TodoItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
}

TodoItem.defaultProps = {
  data: {},
  onClick: () => {
  },
  onDoubleClick: () => {
  },
} */}

export default TodoItem;