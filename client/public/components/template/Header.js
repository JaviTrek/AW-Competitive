import React, { useEffect, useState } from "react";
import logo from "../../images/awLogo.webp";
import "../../style/template/header.sass";
import axios from "axios";

export const Header = () => {
  // header drawer for smaller screens
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  let [login, setLogin] = useState({
    usernameText: (
      <a href="/login" className="headerNav loginButton">
        Login
      </a>
    ),
    drawerLogoutButton: null,
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
            drawerLogoutButton: (
              <a
                className="headerNav headerMenuButton drawerLogoutButton"
                href={"/logout"}
              >
                Log Out
              </a>
            ),
          });
        }
      })
      .catch((e) => console.error(e));
  }, []);
  return (
    <>
      {isDrawerOpen ? (
        <div
          className="headerDarkBG"
          onClick={() => {
            setIsDrawerOpen(false);
          }}
        />
      ) : (
        <></>
      )}
      <header className="header">
        <a className="headerLogo" href="/">
          <img src={logo} alt="header logo" />
        </a>
        <div
          className={`headerMenu ${
            isDrawerOpen ? "headerMenuOpened" : "headerMenuClosed"
          }`}
        >
          <a className="headerNav" href={"/newGame"}>
            Start a game
          </a>
          <a className="headerNav" href={"/startGames"}>
            Join a game
          </a>
          <a className="headerNav" href={"/currentgames"}>
            Current games
          </a>
          <a className="headerNav" href={"/howtoplay"}>
            How to play
          </a>
          {login["drawerLogoutButton"]}
        </div>
        {login["usernameText"]}
        <div
          className="headerDrawerButton"
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
          }}
        >
          |||
        </div>
      </header>
    </>
  );
};
