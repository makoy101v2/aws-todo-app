// ui/LoadingSpinner.tsx
import styles from "./LoadSpinner/LoadingSpinner.module.css";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
