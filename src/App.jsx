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

export default function App() {
  const [user, setUser] = useState(null);
  async function handleLogOut() {
    const res = await fetch("http://localhost:8000/api/v1/users/logout");
    const data = await res.json();
    setUser(null);
  }

  const isAuth = !!user;

  return (
    <BrowserRouter>
      <Header isAuth={isAuth} handleLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Dashboard isAuth={isAuth} handleLogOut={handleLogOut} />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/market" element={<Market />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
