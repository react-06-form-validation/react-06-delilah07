import styles from './ErrorMessage.module.css';

const ErrorMessage = (_props) => {
  if (_props.message) return <p className={styles.errorMessage}>{_props.message}</p>;
  return null;
};

export default ErrorMessage;
