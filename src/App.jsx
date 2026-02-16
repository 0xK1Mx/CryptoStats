import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import "./style.css";
import Login from "./pages/Login";
import Homepage from "./Pages/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
