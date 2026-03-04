import React, { useState } from "react";
import styles from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to={"/"} onClick={closeMenu}>
          <span className={styles.logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              className="web3icons"
            >
              <path
                fill="#51cf66"
                d="M16.53 9.828H7.557c-2.464 0-4.487 1.868-4.55 4.233 0 .062.05.112.125.112h8.98c2.465.012 4.488-1.868 4.55-4.233a.124.124 0 0 0-.124-.112zm4.345-6.827H7.495A4.413 4.413 0 0 0 3 7.234c0 .062.05.111.112.111H16.5A4.42 4.42 0 0 0 21 3.113C21 3.05 20.944 3 20.882 3zM5.173 21a2.173 2.173 0 1 0 0-4.345 2.173 2.173 0 0 0 0 4.345"
              />
            </svg>
          </span>
        </Link>

        <button
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>

        {/* ✅ Add "open" class when isOpen */}
        <ul className={`${styles.navbar__list} ${isOpen ? styles.open : ""}`}>
          <li className={styles.navbar__item} onClick={closeMenu}>
            News
          </li>

          <li className={styles.navbar__item} onClick={closeMenu}>
            <NavLink to={"/"}>Market</NavLink>
          </li>

          <li className={styles.navbar__item} onClick={closeMenu}>
            <NavLink to={"/watchlist"}>Watchlist</NavLink>
          </li>

          {!isAuthenticated ? (
            <li
              className={`${styles.navbar__item} ${styles.navbar__authItem}`}
              onClick={closeMenu}
            >
              <Link to="/signup" className={styles.navbar__authBtn}>
                Get started
              </Link>
            </li>
          ) : (
            <li
              className={`${styles.navbar__item} ${styles.navbar__authItem}`}
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              <span className={styles.navbar__logoutRow}>
                <i className={`las la-sign-out-alt ${styles.logoutIcon}`}></i>
                <span>Logout</span>
              </span>
            </li>
          )}
        </ul>

        {/* Desktop auth stays here (hidden on mobile via CSS) */}
        <div className={styles.auth}>
          {!isAuthenticated && (
            <button className="btn">
              <Link to="/signup">Get started</Link>
            </button>
          )}

          {isAuthenticated && (
            <span role="button" className="userIcon" onClick={logout}>
              <Link to="/">
                <i className={`las la-sign-out-alt ${styles.logoutIcon}`}></i>
              </Link>
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
