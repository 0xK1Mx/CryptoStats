import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";

function Header({ isAuth }) {
  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <span className={styles.logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
            class="web3icons"
          >
            <path
              fill="#51cf66"
              d="M16.53 9.828H7.557c-2.464 0-4.487 1.868-4.55 4.233 0 .062.05.112.125.112h8.98c2.465.012 4.488-1.868 4.55-4.233a.124.124 0 0 0-.124-.112zm4.345-6.827H7.495A4.413 4.413 0 0 0 3 7.234c0 .062.05.111.112.111H16.5A4.42 4.42 0 0 0 21 3.113C21 3.05 20.944 3 20.882 3zM5.173 21a2.173 2.173 0 1 0 0-4.345 2.173 2.173 0 0 0 0 4.345"
            />
          </svg>
        </span>
      </Link>
      <nav className={styles.navbar}>
        <ul className={styles.navbar__list}>
          <li className={styles.navbar__item}>News</li>
          <li className={styles.navbar__item}>
            <NavLink to={"/"}>Market</NavLink>
          </li>
          <li className={styles.navbar__item}>Watchlist</li>
          <li className={styles.navbar__item}>
            <NavLink to={"/portfolio"}>Portfolio</NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.auth}>
        {!isAuth && (
          <>
            <button className="btn">
              <Link to="/signup">Get started</Link>
            </button>
          </>
        )}
        {isAuth && (
          <span role="button" className="userIcon">
            <Link to="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z" />
              </svg>
            </Link>
          </span>
        )}
      </div>
    </header>
  );
}

export default Header;
