import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import Loading from "./Loading";
import Toast from "./Toast";
import { useAuth } from "../contexts/AuthContext";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  sanitizeInput,
} from "../utils/validation";

function Form({ isLoading, setIsLoading }) {
  const {
    login,
    signup,
    isAuthLoading,
    error: authError,
    setError: setAuthError,
  } = useAuth();

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  function validateForm() {
    const newErrors = {};

    // Email validation
    const sanitizedEmail = sanitizeInput(email);
    if (!sanitizedEmail) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(sanitizedEmail)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message;
    }

    // Confirm password validation (only for signup)
    if (!isLogin) {
      const passwordMatchValidation = validatePasswordMatch(
        password,
        confirmPassword,
      );
      if (!passwordMatchValidation.valid) {
        newErrors.confirmPassword = passwordMatchValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setShowToast(true);
    setAuthError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const sanitizedEmail = sanitizeInput(email);
    const result = isLogin
      ? await login(sanitizedEmail, password)
      : await signup(sanitizedEmail, password, confirmPassword);

    setIsLoading(false);

    if (result.success) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
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

        {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        {errors.confirmPassword && (
          <ErrorMsg>{errors.confirmPassword}</ErrorMsg>
        )}
        {authError && <ErrorMsg>{authError}</ErrorMsg>}

        <button className={styles.signupForm__button} disabled={isAuthLoading}>
          {isAuthLoading ? <Loading /> : isLogin ? "Login" : "Sign Up"}
        </button>

        {showToast && authError && (
          <Toast
            message={authError}
            type="error"
            onClose={() => setShowToast(false)}
            duration={5000}
          />
        )}
        <div
          className={styles.authToggle}
          onClick={() => {
            setErrors({});
            setAuthError(null);
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
  return <div className={styles.errorMsg}>⚠️ {children}</div>;
}

export default Form;
