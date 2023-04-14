import React from "react";
import "../style/App.sass";
import "../style/template/template.sass";
import awLogo from "../images/awLogo.webp";
import charactersGroupshot from "../images/homePageImages/charactersGroup.png";
import redditLogo from "../images/footerImages/Reddit.png";
import ghLogo from "../images/footerImages/GitHub.png";
import discordLogo from "../images/footerImages/Discord.png";
import { RectangleInfo } from "./template/homePageRectangle.js";
import { ScreenShotContainer } from "./template/ScreenshotContainer.js";

export function App() {
  //This is a dictionary (an object that looks like a dictionary)
  const firstBlock = {
    className: "rectangleL",
    title: "Matchmaking",
    paragraph:
      "Online matchmaking allows players to connect with each other over the internet and play the game against each other in a competitive environment. It enables players to set up matches, and compete against each other in real-time, either one-on-one or in teams.",
    icon: "orangeStarTank", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage1.png",
  };
  const secondBlock = {
    className: "rectangleR",
    title: "Design Maps",
    paragraph:
      "Players can use the in-game map editor to design their own maps, selecting terrain types, adding buildings and other structures. ",
    icon: "blueMoonInfantry", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage2.png",
  };
  const thirdBlock = {
    className: "rectangleL",
    title: "Competitive Settings",
    paragraph:
      "Competitive mode offers a structured, high-stakes gameplay experience for players looking to test their skills against others. Competitive mode features matchmaking systems that pair players of similar skill levels, ranking systems that track player progress and determine rewards, and rulesets that enforce fair play and balance.",
    icon: "yellowCometSub", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage3.png",
  };
  const fourthBlock = {
    className: "rectangleR",
    title: "Tournaments",
    paragraph:
      "Tournaments are organized events that offer players the opportunity to compete against each other for prizes and recognition. Tournaments can be structured in a variety of formats, such as single-elimination, double-elimination, round-robin, or Swiss. ",
    icon: "greenEarthFighter", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage4.png",
  };

  return (
    <div className="homepage">
      <div className="homePageBanner">
        <div className="tile" />
        <img className="charactersLined" src={charactersGroupshot} alt="" />
        <img className="logo" src={awLogo} alt="" />
      </div>

      <a className="btn playNowBtn" href="/login">
        Play Now
      </a>

      <div className="logosGrid">
        <a href="https://github.com/FemboyDeveloper/AW-Competitive">
          <img className="ghLogo" src={ghLogo} />
        </a>
        <img className="redditLogo" src={discordLogo} alt="" />
        <img className="discordLogo" src={redditLogo} alt="" />
      </div>

      <div className="remasteredElement">
        <p className="remasteredElementSubtitle">
          The Ultimate Turn-Based Strategy Game
        </p>

        <p className="remasteredElementTitle">Remastered</p>

        <p className="remasteredElementText">
          Play Advance Wars Competitively Join thousands on the nostalgia!
        </p>
      </div>

      <div className="rectangleInfoContainer">
        <RectangleInfo
          className={firstBlock["className"]}
          title={firstBlock["title"]}
          paragraph={firstBlock["paragraph"]}
          icon={firstBlock["icon"]}
          halfImage={firstBlock["halfImage"]}
        >
          <div className="btnContainer">
            <a className="btn" href="/newGame">
              Create your own match
            </a>
            <a className="btn" href="/startGames">
              Join a match
            </a>
            <a className="btn" href="/currentgames">
              Matches already started
            </a>
          </div>
        </RectangleInfo>
        <RectangleInfo
          className={secondBlock["className"]}
          title={secondBlock["title"]}
          paragraph={secondBlock["paragraph"]}
          icon={secondBlock["icon"]}
          halfImage={secondBlock["halfImage"]}
        >
          <div className="btnContainer">
            <div className="btn btn-disabled">Coming Soon!</div>
          </div>
        </RectangleInfo>

        <RectangleInfo
          className={thirdBlock["className"]}
          title={thirdBlock["title"]}
          paragraph={thirdBlock["paragraph"]}
          icon={thirdBlock["icon"]}
          halfImage={thirdBlock["halfImage"]}
        >
          <div className="btnContainer">
            <div className="btn btn-disabled">Coming Soon!</div>
          </div>
        </RectangleInfo>

        <RectangleInfo
          className={fourthBlock["className"]}
          title={fourthBlock["title"]}
          paragraph={fourthBlock["paragraph"]}
          icon={fourthBlock["icon"]}
          halfImage={fourthBlock["halfImage"]}
        >
          <div className="btnContainer">
            <div className="btn btn-disabled">Coming Soon!</div>
          </div>
        </RectangleInfo>
      </div>

      <div className="screenshotCube">
        <ScreenShotContainer />
      </div>

      {/* <div>
        <br />
        <h1>Hello and welcome to the project</h1>
        <p>
          Right now you can make an account, start a game on CF and/or
          join/watch other CF games
        </p>
        <br />

        <h2>Please register to play</h2>
        <p>
          Recommended to not use your real password but something simple like
          "123" or "pass" <br /> (even thou we do hash our passwords/do not save
          anything as plain text)
        </p>
        <a href="/register">
          <span className="btn">Go to registration</span>
        </a>
        <br />
        <br />
        <a href="/login">
          <span className="btn">Go to login</span>
        </a>
        <br />
        <br />
        <h2>Start Playing!</h2>
        <p>
          You can see current matches, join a match or start your own match!
        </p>
        <br />
        <a href="/currentgames">
          <span className="btn">Matches already started</span>
        </a>
        <br />
        <br />
        <a href="/startGames">
          <span className="btn">Join a match</span>
        </a>
        <br />
        <br />
        <a href="/newGame">
          <span className="btn">Create your own match</span>
        </a>
        <br />
      </div> */}
    </div>
  );
}
