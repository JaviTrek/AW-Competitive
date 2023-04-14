import React, { useState } from "react";
import { SmallContainer } from "./template/Container";
import styles from "../style/Form.module.sass";
import "../style/abstracts/flashMessage.sass";
import { useForm } from "react-hook-form";
import axios from "axios";

export function Login() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [flash, setFlash] = useState({
    class: "none",
    message: "",
  });

  // <form method='post' action="/loginUser" className="authenticationForm">


  /*
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
   */

  return (
    <SmallContainer title="Log In">
      <div className={`flashMessage ${flash.class}Flash`}>{flash.message}</div>


      <form
        className="authenticationForm"
        onSubmit={handleSubmit((data) => {
          axios
            .post("/loginUser", null, {
              params: data,
            })
            .then((res) => {
              localStorage.clear();
              localStorage.setItem("user", JSON.stringify(res.data));
              setFlash({
                class: "success",
                message: "You have logged in correctly! Redirecting...",
              });
              //give the user some time to read success message
              setTimeout(() => {
                window.location = "/"
              }, 1500);
            })
            .catch((err) => {
              console.error(err);
              setFlash({
                class: "error",
                message:
                  "Your username or password was incorrect, please try again!",
              });
            });
        })}
      >
        <input
          className={styles.input}
          {...register("username")}
          type="text"
          placeholder="Username"
          maxLength={14}
          required
        />
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          {...register("password")}
          type="password"
          placeholder="Password"
          maxLength={14}
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
