import React from "react";
import { SmallContainer } from "./template/Container";
import styles from "../style/Form.module.sass";

export function Login() {
  return (
    <SmallContainer title="Log In">
      <form method="get" action="/routes/auth">
        <button
          tabIndex={0}
          className={`btn ${styles.discordButton}`}
          type="submit"
        >
          Continue with Discord
        </button>
      </form>

      <div className={styles.orDivider}>
        <div className={styles.orLine} />
        <p>Or</p>
        <div className={styles.orLine} />
      </div>

      <form className="authenticationForm" method="post" action="/loginUser">
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <p className={styles.subtext}>
          New to Advance Wars? <a href="/register">Sign Up</a>
        </p>
        <button tabIndex={0} className={`btn ${styles.loginBtn}`} type="submit">
          Login
        </button>
      </form>
    </SmallContainer>
  );
}
