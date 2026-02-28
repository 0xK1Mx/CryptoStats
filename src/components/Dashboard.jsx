import React from "react";
import Sidebar from "./Sidebar";
import UserDashboard from "./userDashboard";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <UserDashboard />
    </div>
  );
}

export default Dashboard;
