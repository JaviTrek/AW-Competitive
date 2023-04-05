import React from "react";
import "../style/currentPlayer.sass";
import gold from "../images/gold.png";
import clock from "../images/clock.png";
import building from "../images/building.png";
import armyUnit from "../images/unit_Icon.png";
import armyGold from "../images/unit_Gold.png";
import {NameBanner} from "./gameInterface/NameBanner";


export const CurrentPlayer = ({
                                  selectedCharacter,
                                  userName,
                                  bannerColor,
                                  playerBalance,
                                  timePlayed,
                                  armyCount,
                                  armyValue,
                                  income,
                              }) => {
    return (<div className="current-player">
            <div className="current-player-header">
                <img className={`character-image-${bannerColor}`} src={selectedCharacter}/>
                <div className={`character-background-${bannerColor}`}></div>
            </div>
            <div className="player-name">
                <NameBanner name={userName} color={bannerColor}/>
            </div>
            <div className="player-stats">
                <div className="user-info">
                    <div className="stat">
                        <img className="icon" src={clock}/>
                        {timePlayed}
                    </div>
                    <div className="stat">
                        <img className="icon" src={gold}/>
                        {playerBalance}
                    </div>
                    <div className="exp-bar">Placeholder for EXP Bar</div>
                </div>
                <div className="army-stats">
                    <div className="stat">
                        <img className="icon" src={armyUnit}/>
                        {armyCount}
                    </div>
                    <div className="stat">
                        <img className="icon" src={armyGold}/>
                        {armyValue}
                    </div>
                    <div className="stat">
                        <img className="icon" src={building}/>
                        {income}
                    </div>
                </div>
            </div>
        </div>);
};
