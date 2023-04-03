import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style/App.sass";
import { Outlet } from "react-router-dom";
import { CurrentPlayer } from "./currentPlayerInfo/CurrentPlayer";
import awLogo from "../images/awLogo.webp";
import { currentPlayerData } from "./currentPlayerInfo/currentPlayerInfo";

export function Match() {

  return (
    <div className="PVP_Container">
      {currentPlayerData.map((data) => (
        <CurrentPlayer
          selectedCharacter={data.selectedCharacter}
          userName={data.userName}
          bannerColor={data.bannerColor}
          timePlayed={data.timePlayed}
          playerBalance={data.playerBalance}
          armyCount={data.armyCount}
          armyValue={data.armyValue}
          income={data.income}
        />
      ))}
    </div>
  );
}
