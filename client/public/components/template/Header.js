import React, { useEffect, useState } from "react";
import logo from "../../images/awLogo.webp";
import "../../style/template/header.sass";
import axios from "axios";

export const Header = () => {
  // header drawer for smaller screens
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };
  let [login, setLogin] = useState({
    usernameText: (
      <a href="/login" className="headerNav loginButton">
        Login
      </a>
    ),
    drawerLogoutButton: <></>,
  });
  useEffect(() => {
    axios
      .get("/userInfo")
      .then((res) => {
        let username = res.data.data.username;
        if (username) {
          setLogin({
            ...login,
            usernameText: (
              <div className="usernameHeader">
                <div className="triangleDown"></div>
                <div className="usernameText">{username}</div>
                <div className="dropdownMenu">
                  <a href="/logout">Log Out</a>
                </div>
              </div>
            ),
          });
        }
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <header className="header">
      <a className="headerLogo" href="/">
        <img src={logo} alt="header logo" />
      </a>

      <div className="headerMenu">
        <a className="headerNav headerMenuButton" href={"/newGame"}>
          Start a game
        </a>
        <a className="headerNav headerMenuButton" href={"/startGames"}>
          Join a game
        </a>
        <a className="headerNav headerMenuButton" href={"/currentgames"}>
          Current games
        </a>
        <a className="headerNav headerMenuButton" href={"/howtoplay"}>
          How to play
        </a>
      </div>

      {login["usernameText"]}
    </header>
  );
};
