import React from "react";
import { NameBanner } from "./NameBanner";
import '../../style/gameInterface/NameCO.sass'
import '../../style/currentPlayer.sass'

export const NameCO = ({
  name = "name",
  color = "red",
  character = "max",
  playerNumber = "1",
}) => {
  return (
    <div className={`NameCO playerNumber${playerNumber}`}>
      {/* If the character pulled from the database if empty(""), replace with Rachel. */}
      { character == "" ? <img
        className="NameCOImage"
        src={`../../images/CO/Rachel-Full.png`}
        alt={`character ${playerNumber}`}
        style={{ filter: "brightness(0%)" }}
      /> :
      <div
        className={`NameCOImage ${character}Player`}
        //src={`../../images/CO/${character}-Full.png`}
        alt={`character ${playerNumber}`}> </div>}
      <NameBanner name={name} color={color} />
    </div>
  );
};
