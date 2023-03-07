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
      <img
        className="NameCOImage"
        src={`../../images/CO/${character}-Full.png`}
        alt={`character ${playerNumber}`}
      />
      <NameBanner name={name} color={color} />
    </div>
  );
};
