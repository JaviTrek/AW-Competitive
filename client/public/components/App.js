import React from "react";
import '../style/App.sass'
import awLogo from "../images/awLogo.webp"
import bannerMap from "../images/homePageImages/backgroundMap.png";
import charactersGroupshot from "../images/homePageImages/charactersGroup.png";
import redditLogo from '../images/footerImages/Reddit.png';
import ghLogo from '../images/footerImages/GitHub.png';
import discordLogo from '../images/footerImages/Discord.png';

export function App() {
    
    return (
            <div>

                <div className="backgroundMapTiles">
                    <img className = "tile" src ={bannerMap} alt =""/>  
                        <img className="charactersLined" src = {charactersGroupshot} alt= ""/>
                            <img className = "logo" src ={awLogo} alt =""/>
                </div>

                <div className="playNowBtn">
                    <p1> Play Now</p1>
                </div>

                <div className="logosGrid">
                    <img className = "ghLogo" src ={redditLogo} alt =""/>
                    <img className = "redditLogo" src ={discordLogo} alt =""/>
                    <img className = "discordLogo" src ={ghLogo} alt =""/>
                </div>

                <div className="remasteredElement">
                    <div className ='s1'><p1>The Ultimate Turn-Based Strategy Game</p1></div>
                
                    <div className ='s2'><p1 >Remastered</p1></div>
                    
                    <div className ='s3'> <p1>Play Advance Wars Competitively Join thousands on the nostalgia!</p1></div>
                </div>

            </div>
        
    )
}