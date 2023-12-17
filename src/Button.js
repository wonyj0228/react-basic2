import PropTypes from 'prop-types';
// 버튼 스타일 module화
import styles from './Button.module.css';

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
