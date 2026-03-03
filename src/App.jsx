import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./style.css";
import Signup from "./pages/Signup";
import Homepage from "./Pages/Homepage";
import Market from "./components/Market";
import UserDashboard from "./components/userDashboard";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import WatchlistAssets from "./components/WatchlistAssets";

export default function App() {
  const [user, setUser] = useState(null);
  const [watchList, setWatchlist] = useState([]);
  const isAuth = !!user;

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
        else setUser(null);
      } catch {
        setUser(null);
      }
    }
    loadMe();
  }, []);

  useEffect(() => {
    if (isAuth) {
      setWatchlist(user.watchList || []);
    } else {
      const stored = localStorage.getItem("watchList");
      setWatchlist(stored ? JSON.parse(stored) : []);
    }
  }, [user, isAuth]);

  //Set watchlist to localstorage
  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  async function handleOnAdd(coin) {
    //check if coin is already there
    const isWatched = watchList.some((el) => el.id === coin.id);

    if (!isAuth) {
      if (isWatched) {
        setWatchlist((watchList) =>
          watchList.filter((el) => el.id !== coin.id),
        );
      } else {
        setWatchlist((watchList) => [...watchList, coin]);
      }
      return;
    }
    const method = isWatched ? "DELETE" : "POST";

    const res = await fetch("http://localhost:8000/api/v1/users/watchlist", {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coin),
    });

    const data = await res.json();
    console.log(data.user.watchList);
    setWatchlist(data.user.watchList);
  }

  async function handleLogOut() {
    const res = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setWatchlist([]);
    const data = await res.json();
    setUser(null);
  }

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} handleLogOut={handleLogOut} />
      <div className="wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <Homepage handleOnAdd={handleOnAdd} watchList={watchList} />
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchlistAssets
                watchList={watchList}
                handleOnAdd={handleOnAdd}
              />
            }
          />
          {/* <Route path="/watchlist" element={<Market />}></Route> */}
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Dashboard isAuth={isAuth} handleLogOut={handleLogOut} />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
