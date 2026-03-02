import React from "react";
import styles from "./PortfolioAssets.module.css";

function PortfolioAssets() {
  return (
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
  );
}

export default PortfolioAssets;
