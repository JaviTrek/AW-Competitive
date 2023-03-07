import React from "react";
import "../style/CurrentGames.sass";
import { NameBanner } from "./gameInterface/NameBanner";
import { NameCO } from "./gameInterface/NameCO";

export const CurrentGames = () => {
  return (
    <div className="container">
      <div className="containerName">Current Games</div>
      <div className="containerContent">

        <article className="currentGame">
          {/* CG = currentGame */}
          <div className="CGTopBar">
            <h2 className="CGTitle">
              GL STD [T1]: Femboy <span>vs</span> Mipin
            </h2>
            <h3 className="CGDay">Day 13</h3>
          </div>

          <div className="CGUsers">
            <NameCO
              name="Femboy"
              color="blue"
              character="max"
              playerNumber="1"
            />
            <img className="VSImage" src="../../images/vs.png" />
            <NameCO
              name="Mipin"
              color="red"
              character="sami"
              playerNumber="2"
            />
          </div>

          <div className="CGMap">
            <div className="CGMapImage">
              <img
                src="../../images/causticFinale.png"
                alt="Current Game Map Image"
              />
            </div>
            <h4 className="CGMapName">Caustic Finale</h4>
          </div>

          <div className="CGInfo">
            <p className="CGTime">
              <span className="CGSpan">Time</span>: 06:23:22 until Clock Expires
            </p>
            <p className="CGStartDate">
              <span className="CGSpan">Start Date</span>: 01/28/2023
            </p>
            <p className="CGRuleset">
              <span className="CGSpan">Ruleset</span>: Standard (STD) Tier 2
            </p>
          </div>
        </article>
        
      </div>
    </div>
  );
};
