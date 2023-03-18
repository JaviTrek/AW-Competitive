import React from "react";
import { SmallContainer } from "./template/Container";
import styles from "../style/Form.module.sass";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

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

      <form
        className="authenticationForm"
        onSubmit={handleSubmit((data) => {
          fetch("/loginUser", {
            headers: { "Content-Type": "application/json" },
            method: "post",
            body: JSON.stringify(data),
          })
            .then((res) => res.json)
            .then((json) => console.log("Form Reponse Text: ", json))
            .catch((err) => console.error(err));
          navigate("/");
        })}
      >
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
        <button tabIndex={0} className={`btn ${styles.formBtn}`} type="submit">
          Login
        </button>
      </form>
    </SmallContainer>
  );
}
