import React from "react";
import "../../style/currentPlayer.sass";
import IMG from "../../images/CO/Max-Full.png";
import { NameBanner } from "../gameInterface/NameBanner";


export const CurrentPlayer = ({selectedCharacter,characterBackground,characterImagePosition,userName}) => {
  return (
    <div className="current-player">
      <div className="current-player-header">
        <img className={characterImagePosition} src={selectedCharacter}/>
        <div className={characterBackground}></div>
      </div>
      <div className="player-name">
        <NameBanner name={userName} color="blue" />
      </div>
      <div className="player-stats">
        <div className="user-info">
          <div>33:10:21</div>
          <div>4000</div>
          <div className="exp-bar">Placeholder for EXP Bar</div>
        </div>
        <div className="army-stats">
          <div>32</div>
          <div>114100</div>
          <div>21000</div>
        </div>
      </div>
    </div>
  );
};
