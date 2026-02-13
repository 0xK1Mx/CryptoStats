import React from "react";
import styles from "./Form.module.css";

import Header from "./Header";

function Form() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  console.log(email, password, confirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          passwordConfirm: confirmPassword,
        }),
      });

      const data = await res.json();

      //   throw new Error(`Please`)

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.signupForm__group}>
          <label className="signup-form__label">Enter email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="signup-form__input"
            name="email"
            placeholder="Johndoe@example.com"
            type="email"
            required
          />
        </div>

        <div className={styles.signupForm__group}>
          <label className="signup-form__label">Enter password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-form__input"
            name="password"
            type="password"
            placeholder="*******"
            required
          />
        </div>
        <div className={styles.signupForm__group}>
          <label className="signup-form__label">Confirm password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-form__input"
            name="confirmPassword"
            type="password"
            placeholder="*******"
            required
          />
        </div>

        <button class={styles.signupForm__button}>Create account</button>
      </form>
    </>
  );
}

export default Form;
