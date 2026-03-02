import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import styles from "./userDashboard.module.css";
import { Link } from "react-router-dom";
import PortfolioAssets from "./PortfolioAssets";
import AssetsContainer from "./AssetsContainer";

function UserDashboard() {
  const [user, setUser] = useState({ watchList: [] });
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/users/me", {
          credentials: "include",
        });
        const { user: data } = await res.json();
        setUser(data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  const listCrypto = user.watchList.map((crypto, i) => {
    return (
      <tr className="market__row">
        <td className="market__cell market__cell--rank ">{i + 1}</td>
        <td className="market__cell market__cell--crypto">
          <div className="market__cell market__asset">
            <img
              className="market__cell market__asset-icon"
              src={crypto.image}
            />
            <span className="market__cell market__asset-name">
              {crypto.name}
            </span>
          </div>
        </td>
        <td className="market__cell market__cell--price">
          <span>{crypto.current_price} $</span>
        </td>
        <td className="market__cell market__cell--marketCap">
          <span>{crypto.market_cap} $</span>
        </td>
        <td className="market__cell market__cell--volume">
          <span>${crypto.total_volume} </span>
        </td>
        <td className="market__cell market__cell--supply">
          <span> {crypto.total_supply}</span>
        </td>
        <td>
          <button onClick={() => handleAddFavoris(crypto)} className="btn">
            + add
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.user}>
        <div className={styles.overview}>
          <div>
            {/* <span>Balance</span> */}
            <h3>213,712 $</h3>
            {/* <button>Add fund</button> */}
          </div>
          <button className={styles.btn__add__transaction}>
            + Add transaction
          </button>
        </div>
        <AssetsContainer>
          <PortfolioAssets />
        </AssetsContainer>
      </div>
    </div>
  );
}

function Card({ coin }) {
  return (
    <div className={styles.crypto}>
      <img className={styles.coin} src={coin.image} />
    </div>
  );
}

export default UserDashboard;
