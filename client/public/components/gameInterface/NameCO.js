import React from "react";
import { NameBanner } from "./NameBanner";
import '../../style/gameInterface/NameCO.sass'

export const NameCO = ({
  name = "name",
  color = "red",
  character = "max",
  playerNumber = "1",
}) => {
  return (
    <div className={`NameCO playerNumber${playerNumber}`}>
      {/* If the character pulled from the database if empty(""), replace with sturm. */}
      { character == "" ? <img
        className="NameCOImage"
        src={`../../images/CO/Sturm-Full.png`}
        alt={`character ${playerNumber}`}
        style={{ filter: "brightness(0%)" }}
      /> :
      <img
        className="NameCOImage"
        src={`../../images/CO/${character}-Full.png`}
        alt={`character ${playerNumber}`}
      />}
      <NameBanner name={name} color={color} />
    </div>
  );
};
