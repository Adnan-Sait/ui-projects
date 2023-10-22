import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import { ReactComponent as ReactLogo } from "../../assets/logo.svg";

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link className={styles.logoWrapper} to="/">
          <ReactLogo className={styles.reactLogo} />
          <h2 className={styles.logoText}>Redux-Router</h2>
        </Link>
        <nav className={styles.navbar}>
          <NavLink className={styles.navItem} to="/">
            Home
          </NavLink>
          <NavLink className={styles.navItem} to="/quotes">
            Quotes
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
