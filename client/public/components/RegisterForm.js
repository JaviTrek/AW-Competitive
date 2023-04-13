import React, {useState} from "react";
import { SmallContainer } from "./template/Container";
import styles from "../style/Form.module.sass";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");
    const [flash, setFlash] = useState({
        class: "none", message: "",
    })
  return (
    <SmallContainer title="Register to play">
        <div className={`flashMessage ${flash.class}Flash`}>
            {flash.message}
        </div>


      <form
        className="authenticationForm"
        onSubmit={handleSubmit((data) => {

            axios.post("/registerUser", data, null)
                .then((res) => {
                    setFlash({
                        class: "success", message: "You have registered correctly! Redirecting..."
                    })
                    //give the user some time to read success message
                    setTimeout(() => {
                        navigate("/login")
                    }, 1500)
                })
                .catch((err) => {
                    console.error(err)
                    setFlash({
                        class: "error", message: "Error! User already exists"
                    })
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
        <input
          className={`${styles.input} ${styles.inputPassword}`}
          type="password"
          {...register("confirmPassword", {
            validate: {
              match: (v) => watch("password") == v,
            },
          })}
          placeholder="Confirm Password"
          maxLength={14}
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
