import React from "react";
import styles from "./Trendings.module.css";

function Trendings({ children, coins }) {
  //Take the first 4
  const coinsArr = coins.slice(0, 4);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
    currency: "USD",
  });

  console.log(coinsArr);
  const list = coinsArr.map((el) => {
    return (
      <li className={styles.container__item} key={crypto.randomUUID}>
        <div className={styles.asset}>
          <img className={styles.asset__icon} src={el.image} />
          <span className={styles.asset__name}>{el.name}</span>
        </div>
        <div className={styles.asset__price}>
          <span className={styles.price}>{formatter.format(el.price)} $</span>
        </div>
      </li>
    );
  });

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
