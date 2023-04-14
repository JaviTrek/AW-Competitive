import React from "react";
import awLogo from "../../images/awLogo.webp";
import ghLogo from "../../images/footerImages/GitHub.png";
import rLogo from "../../images/footerImages/Reddit.png";
import dLogo from "../../images/footerImages/Discord.png";
import "../../style/template/footer.sass";

export const Footer = () => {
  return (
    <div className="footer">
      <img className="imageLogo" src={awLogo} alt="" />

      <nav className="menuFooter">
        <a className="menuButtonElementFooter " href="/">
          Home
        </a>
        <a className="menuButtonElementFooter" href="/about">
          About us
        </a>
        <a className="menuButtonElementFooter" href="/howtoplay">
          How to play
        </a>
      </nav>

      <nav className="iconElements">
        <img className="iconButtonElementGridRedditF" src={rLogo} alt="" />
        <img className="iconButtonElementGridDiscordF" src={dLogo} alt="" />
        <img className="iconButtonElementGridGhF" src={ghLogo} alt="" />
      </nav>

      <div className="horizontalLine"> </div>

      <p className="copyrightElement">
        {" "}
        Advance Wars is (c) 1990-2001 Nintendo and (c) 2001 Intelligent Systems.
        All images are copyright their respective owners.
      </p>
    </div>
  );
};
