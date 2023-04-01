import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style/App.sass";
import { Outlet } from "react-router-dom";
import { CurrentPlayer } from "./currentPlayerInfo/CurrentPlayer";
import awLogo from "../images/awLogo.webp";
import { currentPlayerData } from "./currentPlayerInfo/currentPlayerInfo";
import img from "../images/CO/Max-Full.png";

export function Match() {

  return (
    <div className="PVP_Container">
      {currentPlayerData.map((data) => (
        <CurrentPlayer
          selectedCharacter={data.selectedCharacter}
          characterImagePosition={data.characterImage}
          characterBackground={data.characterBackground}
          userName={data.userName}
          playerBanner={data.bannerColor}
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
