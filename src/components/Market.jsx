import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "./../assets/hero.png";
import heroImage2 from "./../assets/hero2.png";
import Pagination from "../components/Pagination";
import Star from "./../components/Star";
import React from "react";
import styles from "./Market.module.css";
import "./../style.css";
import Sidebar from "./Sidebar";
import MarketRow from "./MarketRow";
function Market({ handleOnAdd, watchList }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(function () {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/market");

      const { market } = await res.json();
      setData(market);
    }

    fetchData();
  }, []);

  console.log(data);

  const cryptoList = data.map((el) => {
    return (
      <MarketRow handleOnAdd={handleOnAdd} el={el} watchList={watchList} />
    );
  });

  function formatCompactNumber(number) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 1_000_000) {
      return (number / 1000).toFixed(1).replace(/\.0$/, "") + " K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
      return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + " M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
      return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + " T";
    }
    return number;
  }

  const handleAddFavoris = function (crypto) {
    fetch("http://localhost:8000/api/v1/users/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(crypto),
    });
  };

  return (
    <div className={styles.market}>
      {/* HEADER */}
      <div className={`${styles.row} ${styles.header}`}>
        <div className={styles.rank}>#</div>
        <div className={styles.crypto}>Name</div>
        <div className={styles.price}>Price</div>
        <div className={styles.price}>24H%</div>
        <div className={styles.marketCap}>Market Cap</div>
        <div className={styles.volume}>Volume</div>
        <div className={styles.supply}>Circulating supply</div>
        <div></div>
      </div>

      {/* ROW */}
      {cryptoList}
    </div>
  );
}

export default Market;
