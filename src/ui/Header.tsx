import { Link } from "react-router-dom";

import styles from "./Header/header.module.css";

function Header() {
  return (
    <header className={styles.appheader}>
      <div className={styles.headercontainer}>
        <div className={styles.subappheader}>
          <span className={styles.logo}>📝App</span>
          <nav>
            <Link to="/profile" className={styles.useravatar}>
              👤
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
