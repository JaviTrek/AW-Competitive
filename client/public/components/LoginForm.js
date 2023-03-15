import React from "react";
import { Container } from "./template/Container";
import logo from "../images/awLogo.webp";
import xicon from "../images/template/XIcon.png";
import styles from "../style/LoginForm.module.sass";

export function Login() {
  return (
    <Container styles={styles.container} size="small">
      <img src={logo} alt="website logo" />
      <img src={xicon} alt="X button to go back" />
      <form method="post" action="/loginUser">
        <label htmlFor="username"> Username:</label>
        <input type="text" name="username" />

        <label htmlFor="password"> Password:</label>
        <input type="text" name="password" />

        <button type="submit"> Login</button>
        <br />
      </form>

      <form method="get" action="/routes/auth">
        <button type="submit"> Discord</button>
      </form>
    </Container>
  );
}
