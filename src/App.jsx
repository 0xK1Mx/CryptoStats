import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./style.css";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import WatchlistAssets from "./components/WatchlistAssets";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const [watchList, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setWatchlist(user?.watchList || []);
    } else {
      const stored = localStorage.getItem("watchList");
      setWatchlist(stored ? JSON.parse(stored) : []);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("watchList", JSON.stringify(watchList));
    }
  }, [watchList, isAuthenticated]);

  async function handleOnAdd(coin) {
    const isWatched = watchList.some((el) => el.id === coin.id);

    if (!isAuthenticated) {
      setWatchlist((prev) =>
        isWatched ? prev.filter((el) => el.id !== coin.id) : [...prev, coin],
      );
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
    setWatchlist(data.user.watchList);
  }

  return (
    <>
      <Header />
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
          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <Signup isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
        </Routes>
      </div>
    </>
  );
}
