import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuth }) {
  if (!isAuth) return <Navigate to="/signup" replace />;

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

  return children;
}

export default ProtectedRoute;
