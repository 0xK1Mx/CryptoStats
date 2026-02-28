import Trendings from "./Trendings";
import styles from "./MarketOverview.module.css";
import React, { useEffect, useState } from "react";

function MarketOverview() {
  const [trendings, setTrendings] = useState([]);
  const [newCoins, setNewCoins] = useState([]);
  const [topGainers, setTopGainers] = useState([]);

  useEffect(function () {
    async function fetchTrendings() {
      try {
        const res = await fetch("http://localhost:5000/market");

        const data = await res.json();
        const refactorData = (data.trending ?? []).map(({ item }) => {
          return {
            name: item.name,
            price: item.data.price,
            image: item.large,
          };
        });
        setTrendings(refactorData);
      } catch (error) {}
    }
    fetchTrendings();
  }, []);

  useEffect(function () {
    async function fetchNewCoins() {
      try {
        const res = await fetch("http://localhost:5000/market");

        const data = await res.json();
        const refactorData = (data.newCoins ?? []).map((el) => {
          return {
            name: el.name,
            price: el.current_price,
            image: el.image,
          };
        });
        setNewCoins(refactorData);
      } catch (error) {}
    }
    fetchNewCoins();
  }, []);

  useEffect(function () {
    async function fetchTopGainers() {
      try {
        const res = await fetch("http://localhost:5000/market");

        const data = await res.json();
        const refactorData = (data.top_gainers ?? []).map((el) => {
          return {
            name: el.name,
            price: el.current_price,
            image: el.image,
          };
        });
        setTopGainers(refactorData);
      } catch (error) {}
    }
    fetchTopGainers();
  }, []);

  return (
    <div className={styles.market__overview}>
      <Trendings coins={trendings}>Trendings</Trendings>
      <Trendings coins={newCoins}>New coins</Trendings>
      <Trendings coins={topGainers}>Top gainers</Trendings>
    </div>
  );
}

export default MarketOverview;
