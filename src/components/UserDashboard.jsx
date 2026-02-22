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
      {/* <div className={styles.sidebar}></div> */}
      <div className={styles.overview}>
        <div>
          <span>Balance</span>
          <h3>548,45$</h3>
        </div>
        <button className={styles.btn__add__transaction}>
          Add transaction
        </button>
      </div>
      <div className={styles.assets__container}>
        <ul className={styles.asset__list}>
          <li className={styles.asset}>
            <div className={styles.asset__info}>
              <img
                className={styles.asset__img}
                src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
              />
              <div className={styles.asset__metrics}>
                <div className={styles.asset__name}>Bitcoin</div>
                <div className={styles.asset__price}>97,023$</div>
              </div>
            </div>
            <div className={styles.asset__holding}>
              <div className={styles.asset__value}>153,723$</div>
              <div className={styles.asset__amount}>1.5 BTC</div>
            </div>
          </li>
          <li className={styles.asset}>
            <div className={styles.asset__info}>
              <img
                className={styles.asset__img}
                src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png"
                alt="Ethereum"
              />
              <div className={styles.asset__metrics}>
                <div className={styles.asset__name}>Ethereum</div>
                <div className={styles.asset__price}>5,420$</div>
              </div>
            </div>
            <div className={styles.asset__holding}>
              <div className={styles.asset__value}>27,100$</div>
              <div className={styles.asset__amount}>5 ETH</div>
            </div>
          </li>
          <li className={styles.asset}>
            <div className={styles.asset__info}>
              <img
                className={styles.asset__img}
                src="https://coin-images.coingecko.com/coins/images/4128/large/solana.png"
                alt="Solana"
              />
              <div className={styles.asset__metrics}>
                <div className={styles.asset__name}>Solana</div>
                <div className={styles.asset__price}>210$</div>
              </div>
            </div>
            <div className={styles.asset__holding}>
              <div className={styles.asset__value}>4,200$</div>
              <div className={styles.asset__amount}>20 SOL</div>
            </div>
          </li>
          <li className={styles.asset}>
            <div className={styles.asset__info}>
              <img
                className={styles.asset__img}
                src="https://coin-images.coingecko.com/coins/images/825/large/binance-coin-logo.png"
                alt="BNB"
              />
              <div className={styles.asset__metrics}>
                <div className={styles.asset__name}>BNB</div>
                <div className={styles.asset__price}>680$</div>
              </div>
            </div>
            <div className={styles.asset__holding}>
              <div className={styles.asset__value}>13,600$</div>
              <div className={styles.asset__amount}>20 BNB</div>
            </div>
          </li>
        </ul>
      </div>
      {/* <div className={styles.watchlist}>
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
      </div> */}
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
