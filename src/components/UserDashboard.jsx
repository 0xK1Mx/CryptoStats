import React, { useEffect, useState } from "react";
function UserDashboard() {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/api/v1/users/me", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>hello you are connected</h1>
    </>
  );
}

export default UserDashboard;
