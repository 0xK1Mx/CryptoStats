import React, { useState, useEffect } from "react";
import styles from "./Market.module.css";
import Pagination from "../components/Pagination";
import Star from "../components/Star";
import Sidebar from "./Sidebar";
import MarketRow from "./MarketRow";
import { api } from "../api/client";
import { formatCompactNumber } from "../utils/format";

function Market({ handleOnAdd, watchList }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.getMarketData();
        setData(response.market || []);
      } catch (err) {
        setError("Failed to load market data");
        console.error("Market fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const cryptoList = data.map((el) => (
    <MarketRow
      key={el.id}
      handleOnAdd={handleOnAdd}
      el={el}
      watchList={watchList}
    />
  ));

  if (error) {
    return <div className={styles.error}>⚠️ {error}</div>;
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading market data...</div>;
  }

  return (
    <div className={styles.market}>
      {/* HEADER */}
      <div className={`${styles.row} ${styles.header}`}>
        <div className={styles.rank}>#</div>
        <div className={styles.crypto}>Name</div>
        <div className={styles.price}>Price</div>
        <div className={styles.dailyChange}>24H%</div>
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
