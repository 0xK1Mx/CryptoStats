import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "./../assets/hero.png";
import heroImage2 from "./../assets/hero2.png";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Star from "./../components/Star";
import Market from "../components/Market";

function Homepage({ isAuth }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:5000/market`);

  //       const results = await res.json();

  //       setData(results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [page]);

  useEffect(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  console.log(data);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
    // currency: "USD",
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

  const listCrypto = data.map((crypto, i) => {
    return (
      <tr className="market__row">
        <td className="market__cell market__cell--rank ">
          {crypto.market_cap_rank}
        </td>
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
          <span>{formatter.format(crypto.current_price)} $</span>
        </td>
        <td className="market__cell market__cell--marketCap">
          <span>{formatCompactNumber(crypto.market_cap)} $</span>
        </td>
        <td className="market__cell market__cell--volume">
          <span>${formatCompactNumber(crypto.total_volume)} </span>
        </td>
        <td className="market__cell market__cell--supply">
          <span> {formatter.format(crypto.total_supply)}</span>
        </td>
        <td>
          <span>
            <Star />
          </span>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Header isAuth={isAuth} />
      <div className="hero">
        <div className="heroContainer">
          <img src={heroImage} className="hero__img" />
          <img src={heroImage2} className="hero__img2" />
        </div>
        <h1 className="title">Track your favorites crypto now!</h1>
        <div className="cta">
          <button className="btn">
            <Link to="/signup">Get started</Link>
          </button>
        </div>
      </div>
      <div className="wrapper">
        <main>
          <div className="control" ref={tableRef}>
            <input placeholder="search..." type="text" className="searchBar" />
          </div>
          <Market />
          <Pagination page={page} setPage={setPage} />
        </main>
      </div>
    </>
  );
}

export default Homepage;
