import React from "react";
import "../style/App.sass";
import awLogo from "../images/awLogo.webp";
import bannerMap from "../images/homePageImages/backgroundMap.png";
import charactersGroupshot from "../images/homePageImages/charactersGroup.png";
import redditLogo from "../images/footerImages/Reddit.png";
import ghLogo from "../images/footerImages/GitHub.png";
import discordLogo from "../images/footerImages/Discord.png";
import io from "socket.io-client";
import { RectangleInfo } from "./template/homePageRect.js";

// import UnitPic from '../images/homePageImages/lilDudeIm.png'

const socket = io.connect("http://localhost:4000");

export function App() {
  //This is a dictionary (an object that looks like a dictionary)
  const firstBlock = {
    className: "rectangle1",
    title: "Matchmaking",
    paragraph:
      "Blah blah text, blah blah blah, somehting ,something, something uhhh idk blah blah, hyper competitivee, blah blah esports, blah blah, we're literally making the next Dota/League",
    icon: "../images/homePageImages/rectangleIcon1.png", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage1.png",
  };
  const secondBlock = {
    className: "rectangle2",
    title: "Design Maps",
    paragraph:
      "Blah blah text, blah blah blah, somehting ,something, something uhhh idk blah blah, hyper competitivee, blah blah esports, blah blah, we're literally making the next Dota/League",
    icon: "../images/homePageImages/rectangleIcon2.png", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage2.png",
  };
  const thirdBlock = {
    className: "rectangle3",
    title: "Competitive Settings",
    paragraph:
      "Blah blah text, blah blah blah, somehting ,something, something uhhh idk blah blah, hyper competitivee, blah blah esports, blah blah, we're literally making the next Dota/League",
    icon: "../images/homePageImages/rectangleIcon3.png", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage3.png",
  };
  const fourthBlock = {
    className: "rectangle4",
    title: "Tournaments",
    paragraph:
      "Blah blah text, blah blah blah, somehting ,something, something uhhh idk blah blah, hyper competitivee, blah blah esports, blah blah, we're literally making the next Dota/League",
    icon: "../images/homePageImages/rectangleIcon4.png", // should be the path from homePageRect
    halfImage: "../images/homePageImages/rectangleImage4.png",
  };

  return (
    <React.Fragment>
      <div className="backgroundMapTiles">
        <img className="tile" src={bannerMap} alt="" />
        <img className="charactersLined" src={charactersGroupshot} alt="" />
        <img className="logo" src={awLogo} alt="" />
      </div>

      <div className="playNowBtn">
        <p1> Play Now</p1>
      </div>

      <div className="logosGrid">
        <img className="ghLogo" src={redditLogo} alt="" />
        <img className="redditLogo" src={discordLogo} alt="" />
        <img className="discordLogo" src={ghLogo} alt="" />
      </div>

      <div className="remasteredElement">
        <div className="s1">
          <p1>The Ultimate Turn-Based Strategy Game</p1>
        </div>

        <div className="s2">
          <p1>Remastered</p1>
        </div>

        <div className="s3">
          {" "}
          <p1>
            Play Advance Wars Competitively Join thousands on the nostalgia!
          </p1>
        </div>
      </div>

      <div className="rectangleInfoContainer">
        <div className = "rect1Container">
        <RectangleInfo
          
          title={firstBlock["title"]}
          paragraph={firstBlock["paragraph"]}
          icon={firstBlock["icon"]}
          halfImage={firstBlock["halfImage"]}
        />
        </div>
        
        <div className="rect2Container">
          <RectangleInfo
          
          title={secondBlock["title"]}
          paragraph={secondBlock["paragraph"]}
          icon={secondBlock["icon"]}
          halfImage={secondBlock["halfImage"]} 
        ></RectangleInfo>
        </div>
        
        <div className="rect3Container">
          <RectangleInfo
          
          title={thirdBlock["title"]}
          paragraph={thirdBlock["paragraph"]}
          icon={thirdBlock["icon"]}
          halfImage={thirdBlock["halfImage"]}
        />
        </div>
        
        <div className="rect4Container">
          <RectangleInfo
          
          title={fourthBlock["title"]}
          paragraph={fourthBlock["paragraph"]}
          icon={fourthBlock["icon"]}
          halfImage={fourthBlock["halfImage"]}
        />
        </div>
        
      </div>

      <h2>Add a new User to MongoDB:</h2>
      <a href="/createNewGame">
        <button> Try creating New Game</button>
      </a>
      <a href="/game">
        <button> See game</button>
      </a>
    </React.Fragment>
  );
}
