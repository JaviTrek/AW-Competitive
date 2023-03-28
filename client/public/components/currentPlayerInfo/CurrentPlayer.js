import React from "react";
import "../../style/currentPlayer.sass";
import gold from "../../images/gold.png";
import clock from "../../images/clock.png";
import building from "../../images/building.png";
import { NameBanner } from "../gameInterface/NameBanner";


export const CurrentPlayer = ({
  selectedCharacter,
  characterBackground,
  characterImagePosition,
  userName,
  playerBanner,
  playerBalance,
  timePlayed,
  armyCount,
  armyValue,
  income,
}) => {
  return (
    <div className="current-player">
      <div className="current-player-header">
        <img className={characterImagePosition} src={selectedCharacter} />
        <div className={characterBackground}></div>
      </div>
      <div className="player-name">
        <NameBanner name={userName} color={playerBanner} />
      </div>
      <div className="player-stats">
        <div className="user-info">
          <div className="test">
            <img className="icon" src={clock} />
            {timePlayed}
          </div>
          <div className="test">
            <img className="icon" src={gold} />
            {playerBalance}
          </div>
          <div className="exp-bar">Placeholder for EXP Bar</div>
        </div>
        <div className="army-stats">
          <div className="test">
            <img className="icon" src={gold} />
            {armyCount}
          </div>
          <div className="test">
            <img className="icon" src={gold} />
            {armyValue}
          </div>
          <div className="test">
            <img className="icon" src={building} />
            {income}
          </div>
        </div>
      </div>
    </div>
  );
};
