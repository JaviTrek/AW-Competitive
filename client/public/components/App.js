import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style/App.sass";
import { Outlet } from "react-router-dom";
import { CurrentPlayer } from "./currentPlayerInfo/CurrentPlayer";
import awLogo from "../images/awLogo.webp";
export function App() {
  let userArray = [];
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("/home")
      .then((res) => {
        let userData = res.data.pushData;
        console.log(userData[0].armyColor);
        userData.forEach((user, index) => {
          console.log(user);
          userArray.push(
            <div className="users" key={index}>
              <p> Username: {user.username}</p>
              <p> Army Color: {user.armyColor}</p>
              <p> Favorite CO: {user.favoriteCO}</p>
              <br />
            </div>
          );
          setData(userArray);
        });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    
    <div>

        <img src={awLogo} alt=""/>

        <h1>Welcome to AW-Competitive</h1>
        <p>This application depends on us running our server and client at the same time in order for React (our frontend) talks with Express (our middleman backend) to communicate with MongoDB (our database) for everything to work correctly</p>
        <h2>Add a new User to MongoDB:</h2>
        <form method='post' action="/createUser">
            <label htmlFor="username"> Username:</label>
            <input type="text" name="username"/>

            <label htmlFor="armyColor"> ArmyColor:</label>
            <input type="text" name="armyColor"/>

            <label htmlFor="favoriteCO"> Favorite CO:</label>
            <input type="text" name="favoriteCO"/>

            <button type="submit"> Add new user</button>
            <br/>

        </form>
        <h3> Data from MongoDB</h3>
        {data}
        <br/>
        <Outlet />
        <br/>

    </div>
  );
}
