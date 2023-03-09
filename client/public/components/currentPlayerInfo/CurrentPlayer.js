import React from "react";
import "../../style/currentPlayer.sass";
import IMG from "../../images/maxChar.webp";
import { NameBanner } from "../gameInterface/NameBanner";

export const CurrentPlayer = () => {
  return (
    <div className="current-player">
      <div className="current-player-header">
        <img className="character-image" src={IMG} />
        <div className="character-background"></div>
      </div>
      <div className="player-name">{NameBanner}</div>
      <div className="player-stats">4</div>
    </div>
  );
};
