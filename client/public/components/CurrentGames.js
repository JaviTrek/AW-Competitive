import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./template/Container";
import { GameEntry } from "./GameEntry";
import { useNavigate } from "react-router-dom";

export const CurrentGames = () => {
  const navigate = useNavigate();
  let currentGamesArray = [];
    let myGamesArray = [];
  const [myData, setMyData] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("/getCurrentGames")
      .then((res) => {
          res.data.extraGames.forEach((currentGame) => {
              myGamesArray.push(
                  <GameEntry
                      key={currentGame._id}
                      index={currentGame._id}
                      title={`Standard 1 vs 1 Match`}
                      day={`Day ${currentGame.playerState.day}`}
                      player1={{
                          name: currentGame.playerState.orangeStar.username, // change to player1 in the future
                          color: currentGame.playerState.orangeStar.color, // change to color in NameBanner
                          character: currentGame.playerState.orangeStar.CO,
                      }}
                      player2={{
                          name: currentGame.playerState.blueMoon.username, // change to player1 in the future
                          color: currentGame.playerState.blueMoon.color, // change to color in NameBanner
                          character: currentGame.playerState.blueMoon.CO,
                      }}
                      map={currentGame.mapData.mapName}
                      time="Unlimited"
                      startDate={` ${currentGame.startDate}`}
                      ruleSet="Standard"
                      onClick={`/game?id=${currentGame._id}`}
                      gameID={`${currentGame._id}`}
                  />
              );
          });
          if (myGamesArray.length > 0) setMyData(myGamesArray);


          res.data.pushData.forEach((currentGame) => {
          currentGamesArray.push(
            <GameEntry
              key={currentGame._id}
              index={currentGame._id}
              title={`Standard 1 vs 1 Match`}
              day={`Day ${currentGame.playerState.day}`}
              player1={{
                name: currentGame.playerState.orangeStar.username, // change to player1 in the future
                color: currentGame.playerState.orangeStar.color, // change to color in NameBanner
                character: currentGame.playerState.orangeStar.CO,
              }}
              player2={{
                name: currentGame.playerState.blueMoon.username, // change to player1 in the future
                color: currentGame.playerState.blueMoon.color, // change to color in NameBanner
                character: currentGame.playerState.blueMoon.CO,
              }}
              map={currentGame.mapData.mapName}
              time="Unlimited"
              startDate={` ${currentGame.startDate}`}
              ruleSet="Standard"
              onClick={`/game?id=${currentGame._id}`}
              gameID={`${currentGame._id}`}
            />
          );
        });
        setData(currentGamesArray);

      })
      .catch((e) => {
        console.error(e);
        navigate("/login");
      });
  }, []);
  return (
      <>
          {myData ? <Container title="Your Games">
              {myData}
          </Container> : "" }

    <Container title="All Games">
      {data}
    </Container>
    </>
  );
};
