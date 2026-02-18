import React, { useEffect, useState } from "react";
import styles from "./userDashboard.module.css";

function UserDashboard() {
  const [user, setUser] = useState({ watchList: [] });
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

  return (
    <div className="wrapper">
      <div className={styles.userInfos}>
        <span>Welcome back</span>
        <h3>Ly Kim Thanh</h3>
      </div>
      <div className={styles.watchlist}>
        {user.watchList.map((el) => (
          <Card coin={el} />
        ))}
      </div>
    </div>
  );
}

function Card({ coin }) {
  return (
    <div className={styles.crypto}>
      <img className={styles.coin} src={coin.image} />
    </div>
  );
}

export default UserDashboard;
