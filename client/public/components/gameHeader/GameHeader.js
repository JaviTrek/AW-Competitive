import React, { useState } from "react";
import "../../style/GameHeader.sass";

const borderColor = "#E47220";
const hoveredBordercolor = "black";

const textColor = "white";
const hoveredTextColor = "#E47220";

const buttonBackgroundColor = "black";
const hoveredBackgroundColor = "white";

export const GameHeader = () => {
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
        <div className="vs-container">Femboy vs Mipin</div>
        <div className="date-tracker">
          <p className="ui-label">Game Started: </p> 02/15/2023 -{" "}
          <p className="ui-label">Last Updated: </p> 02/18/2023
        </div>
        <div className="turn-counter">
          <div className="time-value-container">
            <p className="ui-label">Turn: </p>
            <p className="time-value">00:00:00</p>
          </div>
          <div className="day-container">
            <p className="ui-label">Day: </p>
            <p className="time-value">0</p>
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
