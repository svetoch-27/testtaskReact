import styles from '../../css/Todo.module.css';
import PropTypes from 'prop-types';
 import { memo } from 'react'


// function Button({text, onClick}) {
//   return <div className={styles.button} onClick={onClick}>{text}</div>
// }

const Button = memo(({text, onClick}) => {
  return <div className={styles.button} onClick={onClick}>{text}</div>
})

// Button.displayName = 'Button';

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  text: '',
  onClick: () => {
  },
}

export default Button;