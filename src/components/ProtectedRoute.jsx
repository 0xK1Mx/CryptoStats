import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) return null;

  if (!isAuthenticated) return <Navigate to="/signup" replace />;

  return children;
}

export default ProtectedRoute;
