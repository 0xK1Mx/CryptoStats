import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <span></span>
      <div className={styles.auth}>
        <button className={styles.btn}>
          <Link to="/signup">sign up</Link>
        </button>
        <button className={styles.btn}>
          <Link to="/signup">Log in</Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
