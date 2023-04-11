import React, { useEffect, useState } from "react";
import logo from "../../images/awLogo.webp";
import "../../style/template/header.sass";
import axios from "axios";

export const Header = () => {
  let [login, setLogin] = useState(
    <a href="/login" className="headerNav loginButton">
      Login
    </a>
  );
  useEffect(() => {
    axios
      .get("/userInfo")
      .then((res) => {
        let username = res.data.data.username;
        if (username) {
          setLogin(
            <div className={"usernameTitle"}>
              {username}
              <div className="dropdownMenu">
                <a href="/settings" type="GET">
                  User Settings
                </a>
                <a
                  href="/logout"
                >
                  Log Out
                </a>
              </div>
            </div>
          );
        }
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <header className="header">
      <a href="/">
        <img className="headerLogo" src={logo} alt="header logo" />
      </a>

      <nav className="headerMenu">
        <a className="headerNav headerMenuButton" href={'/currentgames'}> Current games</a>
        <a className="headerNav headerMenuButton" href={'/newGame'}> Start a game</a>
          <a className="headerNav headerMenuButton" href={'/startGames'}> Join a game</a>
        <a className="headerNav headerMenuButton"> How to play</a>
      </nav>

      {login}
    </header>
  );
};
