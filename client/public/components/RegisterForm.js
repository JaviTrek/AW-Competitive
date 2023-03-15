import React from "react";

export function Register() {
  return (
    <div>
      <form method="post" action="/registerUser">
        <label htmlFor="username"> Username:</label>
        <input type="text" name="username" />

        <label htmlFor="password"> Password:</label>
        <input type="text" name="password" />

        <button type="submit"> Add new user</button>
        <br />
      </form>

      <form method="get" action="/routes/auth">
        <button type="submit"> Discord</button>
      </form>
    </div>
  );
}
