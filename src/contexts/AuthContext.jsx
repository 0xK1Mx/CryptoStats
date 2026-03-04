import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

//Create the Auth Context
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthentificated: false,
  isAuthLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthentificated: true,
        isAuthLoading: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthentificated: true,
        isAuthLoading: false,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthentificated: false,
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
function AuthProvider({ children }) {
  const [{ user, isAuthentificated, isAuthLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    loadUser();
  }, []);

  const navigate = useNavigate();

  async function singUp(email, password, confirmPassword) {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          passwordConfirm: confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "signup", payload: data.data });
        navigate("/portfolio");
      } else {
        throw new Error("sign up error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function login(email, password) {
    dispatch({ type: "auth/loading" });

    try {
      //
      const res = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      //
      if (!res.ok) throw new Error(data.message || "Login failed");

      setTimeout(() => {
        dispatch({ type: "login", payload: data.data });
        navigate("/portfolio");
      }, 700);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });

      dispatch({ type: "logout" });
      navigate("/");
    } catch (error) {}
  }
  async function loadUser() {
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/me", {
        credentials: "include",
      });

      if (!res.ok) {
        dispatch({ type: "authDone" });
        return;
      }

      const data = await res.json();
      dispatch({ type: "login", payload: data.user });
    } catch {
      dispatch({ type: "authDone" });
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthentificated,
        isAuthLoading,
        login,
        singUp,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) throw new Error("The Auth context is use outside");

  return context;
}

export { AuthProvider, useAuth };
