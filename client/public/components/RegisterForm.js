import React from "react";
import { SmallContainer } from "./template/Container";
import styles from "../style/Form.module.sass";
import { useForm } from "react-hook-form";

export function Register() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirm_password");

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

      {/* <form className="authenticationForm" method="post" action="/registerUser"> */}
      <form
        className="authenticationForm"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <input
          className={styles.input}
          {...register("username")}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          {...register("password")}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          type="password"
          {...register("confirm_password", {
            validate: {
              match: (v) => watch("password") == v,
            },
          })}
          placeholder="Confirm Password"
          required
        />
        {watchPassword != watchConfirmPassword &&
          (watchPassword != "" || watchConfirmPassword != "") && (
            <p className={styles.subtext} style={{ color: "red" }}>
              Passwords do not match
            </p>
          )}

        <button tabIndex={0} className={`btn ${styles.formBtn}`} type="submit">
          Sign Up
        </button>
      </form>
    </SmallContainer>
  );
}
