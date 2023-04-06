import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./template/Container";
import { GameEntry } from "./GameEntry";
import { redirect } from "react-router-dom";

export const StartGames = () => {
  let startGamesArray = [];
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("/getStartGames")
      .then((res) => {
        let startGamesData = res.data.pushData;
        startGamesData.forEach((startGame) => {
          startGamesArray.push(
            <GameEntry
              index={startGame._id}
              title="empty"
              day={`Day ${startGame.playerState.day}`}
              player1={{
                name: startGame.playerState.orangeStar.username, // change to player1 in the future
                CO: startGame.playerState.orangeStar.color, // change to color in NameBanner
                character: startGame.playerState.orangeStar.CO,
              }}
              player2={{
                name: startGame.playerState.blueMoon.username, // change to player1 in the future
                CO: startGame.playerState.blueMoon.color, // change to color in NameBanner
                character: startGame.playerState.blueMoon.CO,
              }}
              map="Map name here"
              time="99:99:99 until Clock Expires"
              startDate="04/20/1969"
              ruleSet="RULE SET HERE IDK"
            />
          );
        });
        setData(startGamesArray);
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
        // window.location = "/login";
      });
  }, []);

  return (
    <Container title="Pending Games">
      {/* <GameEntry
        title="This is the title!!!"
        day="This is the Day of the game"
        player1={{
          name: "Player1's name",
          CO: "blue",
          character: "max",
        }}
        player2={{
          name: "Player2's name",
          CO: "orange",
          character: "sami",
        }}
        map="Map name here"
        time="99:99:99 until Clock Expires"
        startDate="04/20/1969"
        ruleSet="RULE SET HERE IDK"
      /> */}
      {data}
    </Container>
  );
};
