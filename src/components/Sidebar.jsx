import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebar__list}>
        <li role="button" className={styles.sidebar__item}>
          <Link to={"/"}>
            <i class="las la-home"></i>
            <span>Home</span>
          </Link>
        </li>
        <li role="button" className={styles.sidebar__item}>
          <Link to={"/market"}>
            <i class="las la-stream"></i>
            <span>Market</span>
          </Link>
        </li>
        <li role="button" className={styles.sidebar__item}>
          <Link to={"/exchange"}>
            <i class="las la-exchange-alt"></i>
            <span>Exchange</span>
          </Link>
        </li>
        <li role="button" className={styles.sidebar__item}>
          <Link to={"/signup"}>
            <i class="las la-sign-out-alt"></i>
            <span>Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
