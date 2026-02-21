import React, { useEffect, useState } from "react";
import styles from "./userDashboard.module.css";

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
    <div className="wrapper">
      <div className={styles.userInfos}>
        <span>Welcome back</span>
        <h3>Ly Kim Thanh</h3>
      </div>
      <div className={styles.watchlist}>
        <table className="market">
          <thead className="market__head">
            <tr className="market__row">
              <th className="market__cell market__cell--rank">#</th>
              <th className="market__cell market__cell--crypto">
                <span>Name</span>
              </th>
              <th className="market__cell market__cell--price">
                <span>Price</span>
              </th>
              <th className="market__cell market__cell--marketCap">
                <span>Market Cap</span>
              </th>
              <th className=" market__cell market__cell--volume">
                <span>Volume</span>
              </th>
              <th className="market__cell market__cell--supply">
                <span>Circulating supply</span>
              </th>
              <th className=" market__cell market__cell"></th>
            </tr>
          </thead>
          <tbody className="market__body">{listCrypto}</tbody>
        </table>
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
