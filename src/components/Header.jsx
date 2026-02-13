import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <span>LOGO</span>
      <div className={styles.auth}>
        <button className={styles.btnSignUp}>Sign up</button>
        <button className={styles.btnLogIn}>
          <Link to="/login">Log in</Link>
        </button>
      </div>
    </header>
  );
}

export default Header;
