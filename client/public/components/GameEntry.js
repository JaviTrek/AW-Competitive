import React from "react";
import "../style/GameEntry.sass";
import { NameCO } from "./gameInterface/NameCO";

export const GameEntry = ({
  title = (
    <>
      GL STD [T1]: Femboy <span>vs</span> Mipin
    </>
  ),
  // title = "GL STD [T1]: Femboy vs Mipin",
  day = "Day 13",
  player1 = {
    name: "Femboy",
    color: "blue",
    character: "max",
  },
  player2 = {
    name: "Mipin",
    color: "orange",
    character: "sami",
  },
  map = "Caustic Finale",
  time = "06:23:22 until Clock Expires",
  startDate = "01/28/2023",
  ruleSet = "Standard (STD) Tier 2",
  onClick,
}) => {

  return (
      <a href={onClick}>
      <article
      className="currentGame"
    >

      <div className="CGTopBar">
        <h2 className="CGTitle">{title}</h2>
        <h3 className="CGDay">{day}</h3>
      </div>

      <div className="CGUsers">
        <NameCO
          name={player1.name}
          color={player1.color}
          character={player1.character}
          playerNumber="1"
        />
        <img className="VSImage" src="../../images/vs.png" />
        <NameCO
          name={player2.name}
          color={player2.color}
          character={player2.character}
          playerNumber="2"
        />
      </div>

      <div className="CGMap">
        <img
          className="CGMapImage"
          src={`../../images/mapTiles/full/${map.replace(/\s+/g, '-')}-Small.png`}
          alt="Current Game Map Image"
        />
        <h4 className="CGMapName">{map}</h4>
      </div>

      <div className="CGInfo">
        <p className="CGTime">
          <span className="CGSpan">Time</span>: {time}
        </p>
        <p className="CGStartDate">
          <span className="CGSpan">Start Date</span>: {startDate}
        </p>
        <p className="CGRuleset">
          <span className="CGSpan">Ruleset</span>: {ruleSet}
        </p>
      </div>

    </article>
      </a>
  );
};