import React from "react";
import styles from "./MarketRow.module.css";
import Star from "./Star";

const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
  currency: "USD",
});

function MarketRow({ handleOnAdd, el, watchList }) {
  const isWatched = watchList.some((coin) => coin.id === el.id);

  return (
    <div className={styles.row}>
      <div className={styles.rank}>{el.market_cap_rank}</div>

      <div className={styles.crypto}>
        <div className={styles.asset}>
          <img className={styles.assetIcon} src={el.image} alt={el.id} />
          <span className={styles.assetName}>{el.name}</span>
        </div>
      </div>

      <div className={styles.price}>{formatter.format(el.current_price)} $</div>
      <div
        className={`${styles.dailyChange} ${el.price_change_percentage_24h > 0 ? styles.positive : styles.negative}`}
      >
        <span>{el.price_change_percentage_24h.toFixed(2)}</span>
      </div>
      <div className={styles.marketCap}>
        {formatter.format(el.market_cap)} $
      </div>
      <div className={styles.volume}>{formatter.format(el.total_volume)}</div>
      <div className={styles.supply}>
        {formatter.format(el.circulating_supply)}
      </div>
      {/* <button onClick={handleAddToWatchList}>Add</button> */}
      <Star isWatched={isWatched} onHandleFav={handleOnAdd} el={el} />
    </div>
  );
}

export default MarketRow;
