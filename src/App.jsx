import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import "./style.css";
import Signup from "./pages/Signup";
import Homepage from "./Pages/Homepage";
import UserDashboard from "./components/UserDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/UserDashboard" element={<UserDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
