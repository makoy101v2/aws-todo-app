import styles from "./Menubar/menubar.module.css";
import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <nav className={styles.topmenu} aria-label="Main menu">
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link to="/dashboard" className={styles.menuButton}>
            Dashboard
          </Link>
        </li>
        <li className={styles.menuItem}>
          <button className={styles.menuButton}>
            <Link to="/todo" className={styles.menuButton}>
              Todo
            </Link>
          </button>
        </li>
        <li className={styles.menuItem}>
          <button className={styles.menuButton}>
            <Link to="/adventure" className={styles.menuButton}>
              Adventure
            </Link>
          </button>
        </li>
        <li className={styles.menuItem}>
          <button className={styles.menuButton}>
            <Link to="budget" className={styles.menuButton}>
              Budget
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MenuBar;
