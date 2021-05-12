import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import styles from '../../css/Todo.module.css';


function TodoList({items}) {

  return <div className={styles.list}>{items.map(item => <TodoItem key={item.id} data={item}/>)}</div>;
}

//  const TodoList = ({//items, onItemClick, onItemDoubleClick}) => {

//   return (<div className={styles.list}>
//       {items.map(item => (
//         <TodoItem
//           key={item.id}
//           onClick={onItemClick}
//           onDoubleClick={onItemDoubleClick}
//           data={item}
//         />)
//       )}
//     </div>
//   );
// };

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  // onItemClick: PropTypes.func,
  // onItemDoubleClick: PropTypes.func,
}

// TodoList.propTypes = {
//   items: PropTypes.arrayOf(PropTypes.shspe(shapeTypes {
//     title: PropTypes.string,
//     completed: PropTypes.bool
//   })),
// }



TodoList.defaultProps = {
  items: [],
  // onItemClick: () => {
  // },
  // onItemDoubleClick: () => {
  // },
}

export default TodoList;