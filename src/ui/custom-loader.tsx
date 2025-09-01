import styles from "./Loader/loader.module.css";

function Loader() {
  return (
    <div
      className={styles.loaderContainer}
      role="status"
      aria-label="Loading"
      data-testid="loader"
    >
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loader;
