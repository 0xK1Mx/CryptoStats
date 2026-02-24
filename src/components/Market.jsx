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
function Market() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
    // currency: "USD",
  });

  useEffect(function () {
    async function fetchData() {
      const res = await fetch("http://127.0.0.1:8000/api/v1/markets?page=1");

      const { data } = await res.json();

      setData(data);
    }

    fetchData();
  }, []);

  console.log(data);

  const cryptoList = data.map((el) => {
    return (
      <div className={styles.row}>
        <div className={styles.rank}>{el.row}</div>

        <div className={styles.crypto}>
          <div className={styles.asset}>
            <img className={styles.assetIcon} src={el.image} alt={el.id} />
            <span className={styles.assetName}>{el.name}</span>
          </div>
        </div>

        <div className={styles.price}>1.00 $</div>
        <div className={styles.marketCap}>74.7 B $</div>
        <div className={styles.volume}>$12.9 B</div>
        <div className={styles.supply}>74,709,655,538.2755</div>
        <div></div>
      </div>
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
    <div className={styles.container}>
      <Sidebar />
      <main>
        <div className={styles.market}>
          {/* HEADER */}
          <div className={`${styles.row} ${styles.header}`}>
            <div className={styles.rank}>#</div>
            <div className={styles.crypto}>Name</div>
            <div className={styles.price}>Price</div>
            <div className={styles.marketCap}>Market Cap</div>
            <div className={styles.volume}>Volume</div>
            <div className={styles.supply}>Circulating supply</div>
            <div></div>
          </div>

          {/* ROW */}
          {cryptoList}
        </div>

        <Pagination page={page} setPage={setPage} />
      </main>
    </div>
  );
}

export default Market;
