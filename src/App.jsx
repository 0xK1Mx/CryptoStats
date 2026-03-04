import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./style.css";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import WatchlistAssets from "./components/WatchlistAssets";
import { useAuth } from "./contexts/AuthContext";
import { api, APIError } from "./api/client";

export default function App() {
  const [watchList, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

    try {
      const method = isWatched ? "removeFromWatchlist" : "addToWatchlist";
      const data = await api[method](coin);
      setWatchlist(data.user.watchList);
    } catch (err) {
      const errorMessage =
        err instanceof APIError ? err.message : "Failed to update watchlist";
      setError(errorMessage);
      console.error("Watchlist error:", err);
    }
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
