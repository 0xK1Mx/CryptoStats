import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { api, APIError } from "../api/client";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAuthLoading: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAuthLoading: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isAuthLoading: false,
      };
    case "auth/loading":
      return { ...state, isAuthLoading: true };

    case "authDone":
      return { ...state, isAuthLoading: false };

    default:
      return state;
  }
}

//Provide the context
//Create the Auth Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isAuthLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const [error, setError] = React.useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const navigate = useNavigate();

  async function signup(email, password, confirmPassword) {
    setError(null);
    try {
      const data = await api.signup(email, password, confirmPassword);
      dispatch({ type: "signup", payload: data.data });
      navigate("/portfolio");
      return { success: true };
    } catch (err) {
      const message =
        err instanceof APIError
          ? err.message
          : "Signup failed. Please try again.";
      setError(message);
      console.error("Signup error:", err);
      return { success: false, error: message };
    }
  }

  async function login(email, password) {
    setError(null);
    dispatch({ type: "auth/loading" });

    try {
      const data = await api.login(email, password);

      setTimeout(() => {
        dispatch({ type: "login", payload: data.data });
        navigate("/portfolio");
      }, 700);
      return { success: true };
    } catch (err) {
      const message =
        err instanceof APIError
          ? err.message
          : "Login failed. Please try again.";
      setError(message);
      dispatch({ type: "authDone" });
      console.error("Login error:", err);
      return { success: false, error: message };
    }
  }

  async function logout() {
    try {
      await api.logout();
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  async function loadUser() {
    try {
      const data = await api.getMe();
      dispatch({ type: "login", payload: data.user });
    } catch (err) {
      dispatch({ type: "authDone" });
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthLoading,
        login,
        signup,
        logout,
        loadUser,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Auth context used outside of provider");

  return context;
}

export { AuthProvider, useAuth };
