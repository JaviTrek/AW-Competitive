import React from "react";
import { SmallContainer } from "./template/Container";
import styles from "../style/Form.module.sass";

export function Register() {
  return (
    <SmallContainer title="Sign In">

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

      <form className="authenticationForm" method="post" action="/registerUser">
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          type="password"
          placeholder="Password"
          name="password"
        />
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          type="password"
          placeholder="Confirm Password"
        />

        <button tabIndex={0} className={`btn ${styles.loginBtn}`} type="submit">
          Sign Up
        </button>
      </form>

    </SmallContainer>
  );
}
