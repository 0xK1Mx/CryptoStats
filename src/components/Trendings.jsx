import React from "react";
import styles from "./Trendings.module.css";
import { formatter } from "../utils/format";

function Trendings({ children, coins }) {
  const coinsArr = coins.slice(0, 4);

  const list = coinsArr.map((el) => (
    <li className={styles.container__item} key={el.id || el.name}>
      <div className={styles.asset}>
        <img className={styles.asset__icon} src={el.image} alt={el.name} />
        <span className={styles.asset__name}>{el.name}</span>
      </div>
      <div className={styles.asset__price}>
        <span className={styles.price}>
          {formatter.format(el.current_price)} $
        </span>
      </div>
    </li>
  ));

  return (
    <div className={styles.trendings}>
      <h2>{children}</h2>
      <div className={styles.container}>
        <ol className={styles.container__list}>{list}</ol>
      </div>
    </div>
  );
}

export default Trendings;
