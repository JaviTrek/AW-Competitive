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
      <div className="player-name">
        <NameBanner name="Emasaur" color="blue" />
      </div>
      <div className="player-stats">
        <div className="user-info">
          <div>3</div>
          <div>4</div>
          <div className="test">YOO</div>
        </div>
        <div className="army-stats">
          <div>5</div>
          <div>6</div>
          <div>7</div>
        </div>
      </div>
    </div>
  );
};
