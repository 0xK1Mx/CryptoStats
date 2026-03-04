import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styles from "./userDashboard.module.css";
import PortfolioAssets from "./PortfolioAssets";
import AssetsContainer from "./AssetsContainer";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../api/client";

function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        await api.getMe();
      } catch (err) {
        setError("Failed to load user data");
        console.error("Fetch user error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleRemoveFromWatchlist = async (crypto) => {
    try {
      await api.removeFromWatchlist(crypto);
    } catch (err) {
      setError("Failed to remove from watchlist");
      console.error("Remove watchlist error:", err);
    }
  };

  const listCrypto = user?.watchList?.map((crypto, i) => (
    <tr key={crypto.id} className="market__row">
      <td className="market__cell market__cell--rank ">{i + 1}</td>
      <td className="market__cell market__cell--crypto">
        <div className="market__cell market__asset">
          <img className="market__cell market__asset-icon" src={crypto.image} />
          <span className="market__cell market__asset-name">{crypto.name}</span>
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
        <button
          onClick={() => handleRemoveFromWatchlist(crypto)}
          className="btn"
        >
          Remove
        </button>
      </td>
    </tr>
  ));

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
