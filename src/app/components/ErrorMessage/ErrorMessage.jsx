import styles from './ErrorMessage.module.css';

const ErrorMessage = (_props) => {
  // TODO: implement error message rendering according to README requirements
  if (_props.message) return <p className={styles.errorMessage}>{_props.message}</p>;
  return null;
};

export default ErrorMessage;
