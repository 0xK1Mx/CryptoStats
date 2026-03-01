import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./style.css";
import Signup from "./pages/Signup";
import Homepage from "./Pages/Homepage";
import Market from "./components/Market";
import UserDashboard from "./components/userDashboard";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(null);
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

  const isAuth = !!user;

  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage isAuth={isAuth} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute isAuth={isAuth}>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/market" element={<Market />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
