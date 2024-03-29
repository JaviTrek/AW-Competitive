import React, { useState } from "react";
import "../style/GameHeader.sass";

const borderColor = "black";
const hoveredBordercolor = "black";

const textColor = "#E47220";
const hoveredTextColor = "black";

const buttonBackgroundColor = "black";
const hoveredBackgroundColor = "#E47220";

export const GameHeader = ({player1Name, player2Name, gameStartDate, lastUpdatedDate, onClick, day}) => {
    const [buttonBackground, setButtonBackground] = useState(
        buttonBackgroundColor
    );
    const [buttonTextColor, setButtonTextColor] = useState(textColor);
    const [buttonBorder, setButtonBorder] = useState("2px solid " + borderColor);

    function buttonHover() {
        setButtonBackground(hoveredBackgroundColor);
        setButtonTextColor(hoveredTextColor);
        setButtonBorder("3px solid " + hoveredBordercolor);
    }

    function buttonNotHovered() {
        setButtonBackground(buttonBackgroundColor);
        setButtonTextColor(textColor);
        setButtonBorder("2px solid " + borderColor);
    }

    return (
        <>
            <div className="matchInfo">
                <div className="vs-container">{player1Name} vs {player2Name}</div>
                <div className="date-tracker">
                    <p className="ui-label">Game Started: </p> {gameStartDate} -{" "}
                    <p className="ui-label">Last Updated: </p> {lastUpdatedDate}
                </div>
                <div className="turn-counter">
                    <div className="time-value-container">
                        <p className="ui-label">Turn: </p>
                        <p className="time-value">00:00:00</p>
                    </div>
                    <div className="day-container">
                        <p className="ui-label">Day/Turn: </p>
                        <p className="time-value">{day}</p>
                    </div>
                    <div className="time-value-container">
                        <p className="ui-label">Turn: </p>
                        <p className="time-value">00:00:00</p>
                    </div>
                    <div className="buttons-container">
                        {/*
                   For DEMO Day Purposes, these buttons and their functionalities will not be included but
                    eventually they will be implemented
                                                                          */
                            /*
                            <div className="container-item">[02, 02]</div>
                            <div className="container-item">
                              <button className="ui-button">CLICK</button>
                            </div>
                            <div className="container-item">
                              <button className="ui-button">CLICK</button>
                            </div>
                            <div className="container-item">
                              <button className="ui-button">CLICK</button>
                            </div> */}

                        <div className="container-item">
                            <button
                                className="ui-button"
                                style={{
                                    backgroundColor: buttonBackground,
                                    color: buttonTextColor,
                                    border: buttonBorder,
                                }}
                                onMouseOver={buttonHover}
                                onMouseOut={buttonNotHovered}
                                onClick={onClick}
                            >
                                End Turn
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div className="test">GAME</div> */}
            </div>
        </>
    );
};