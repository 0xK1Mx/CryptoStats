import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthentificated, isAuthLoading } = useAuth();

  if (isAuthLoading) return null;

  if (!isAuthentificated) return <Navigate to="/signup" replace />;

  return children;
}

export default ProtectedRoute;
