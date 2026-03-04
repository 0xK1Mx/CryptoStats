import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

import Loading from "./Loading";
import { useAuth } from "../contexts/AuthContext";

function Form({ isLoading, setIsLoading }) {
  const { login, signup, isAuthenticated, isAuthLoading } = useAuth();

  const [isLogin, setIsLogin] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    setError("");
    e.preventDefault();

    setIsLoading(true);

    isLogin ? login(email, password) : signup(email, password, confirmPassword);

    if (isAuthenticated) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.formTitle}>
          {isLogin ? "Login" : "Create your account"}
        </h2>

        <div className={styles.signupForm__group}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.signupForm__group}>
          <label>Password</label>
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
            <label>Confirm your password</label>

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        {isLogin && error && <ErrorMsg>{error}</ErrorMsg>}
        <button className={styles.signupForm__button} disabled={isAuthLoading}>
          {isAuthLoading ? <Loading /> : isLogin ? "Login" : "Sign Up"}
        </button>
        <div
          className={styles.authToggle}
          onClick={() => {
            setError("");
            return setIsLogin(!isLogin);
          }}
        >
          {isLogin ? (
            <p>
              Don't have an account?
              <em
                style={{
                  color: "#51cf66",
                  fontStyle: "normal",
                }}
              >
                {" "}
                Sign up
              </em>
            </p>
          ) : (
            <p>Already have an account</p>
          )}
        </div>
      </form>
    </>
  );
}

function ErrorMsg({ children }) {
  return <div className={styles.errorMsg}>{children}</div>;
}

export default Form;
