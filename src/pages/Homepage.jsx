import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "./../assets/hero.png";
import heroImage2 from "./../assets/hero2.png";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import Star from "./../components/Star";
import Market from "../components/Market";
import Trendings from "../components/Trendings";
import MarketOverview from "../components/MarketOverview";

function Homepage({ handleOnAdd, watchList }) {
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

  return (
    <>
      <main>
        <MarketOverview />
        {/* <div className="control" ref={tableRef}>
            <input placeholder="search..." type="text" className="searchBar" />
          </div> */}
        <Market handleOnAdd={handleOnAdd} watchList={watchList} />
        <Pagination page={page} setPage={setPage} />
      </main>
    </>
  );
}

export default Homepage;
