import Trendings from "./Trendings";
import styles from "./MarketOverview.module.css";
import React, { useEffect, useState } from "react";
import { api } from "../api/client";

function MarketOverview() {
  const [trendings, setTrendings] = useState([]);
  const [newCoins, setNewCoins] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getMarketData();

        const refactorTrendings = (data.trending ?? []).map(({ item }) => ({
          id: item.id,
          name: item.name,
          current_price: item.data.price,
          image: item.large,
        }));

        const refactorNewCoins = (data.newCoins ?? []).map((el) => ({
          id: el.id,
          name: el.name,
          current_price: el.current_price,
          image: el.image,
        }));

        const refactorTopGainers = (data.top_gainers ?? []).map((el) => ({
          id: el.id,
          name: el.name,
          current_price: el.current_price,
          image: el.image,
        }));

        setTrendings(refactorTrendings);
        setNewCoins(refactorNewCoins);
        setTopGainers(refactorTopGainers);
      } catch (err) {
        setError("Failed to load market overview");
        console.error("Market overview fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketData();
  }, []);

  if (error)
    return (
      <div style={{ color: "#f44336", textAlign: "center", padding: "20px" }}>
        ⚠️ {error}
      </div>
    );
  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
    );

  return (
    <div className={styles.market__overview}>
      <Trendings coins={trendings}>Trendings</Trendings>
      <Trendings coins={newCoins}>New coins</Trendings>
      <Trendings coins={topGainers}>Top gainers</Trendings>
    </div>
  );
}

export default MarketOverview;
