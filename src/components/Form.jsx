import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

import Header from "./Header";

function Form() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:8000/api/v1/users/login"
      : "http://localhost:8000/api/v1/users/signup";

    const body = isLogin
      ? { email, password }
      : { email, password, passwordConfirm: confirmPassword };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/UserDashboard");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />

      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <div className={styles.signupForm__group}>
          <input
            type="email"
            placeholder="Johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.signupForm__group}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className={styles.signupForm__group}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        {isLogin
          ? error && <ErrorMsg>{error}</ErrorMsg>
          : error && <ErrorMsg>{error}</ErrorMsg>}
        <button className={styles.signupForm__button}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          style={{ cursor: "pointer", marginTop: "1rem" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </form>
    </>
  );
}

function ErrorMsg({ children }) {
  return <div className={styles.errorMsg}>{children}</div>;
}

export default Form;
