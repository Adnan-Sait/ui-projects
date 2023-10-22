import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link className={styles.logoWrapper} to="/" aria-label="Quotes">
          <img
            className={styles.reactLogo}
            src={logo}
            alt="Logo with the letter Q"
          />
          <h2 className={styles.logoText}>uotes</h2>
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
