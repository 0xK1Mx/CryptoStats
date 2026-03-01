import React from "react";
import Sidebar from "../components/Sidebar";
import UserDashboard from "../components/userDashboard";
import styles from "./Dashboard.module.css";
import Header from "../components/Header";

function Dashboard({ isAuth, handleLogOut }) {
  return (
    <>
      <div className="wrapper">
        <UserDashboard />
      </div>
    </>
  );
}

export default Dashboard;
