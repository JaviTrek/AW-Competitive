import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "./template/Container";
import { GameEntry } from "./GameEntry";

export const CurrentGames = () => {
    let currentGamesArray = [];
    const [data, setData] = useState();
    useEffect(() => {
      axios
        .get("/getCurrentGames")
        .then((res) => {
          let currentGamesData = res.data.pushData;
          currentGamesData.forEach((currentGame) => {
            currentGamesArray.push(
              <GameEntry
                index={currentGame._id}
                title="empty"
                day={`Day ${currentGame.playerState.day}`}
                player1={{
                  name: currentGame.playerState.orangeStar.username, // change to player1 in the future
                  CO: currentGame.playerState.orangeStar.color, // change to color in NameBanner
                  character: currentGame.playerState.orangeStar.CO,
                }}
                player2={{
                  name: currentGame.playerState.blueMoon.username, // change to player1 in the future
                  CO: currentGame.playerState.blueMoon.color, // change to color in NameBanner
                  character: currentGame.playerState.blueMoon.CO,
                }}
                map="Map name here"
                time="99:99:99 until Clock Expires"
                startDate="04/20/1969"
                ruleSet="RULE SET HERE IDK"
              />
            );
          });
          setData(currentGamesArray);
        })
        .catch((e) => {
          console.error(e);
          window.location = "/login";
        });
    }, []);
  return (
    <Container title="Current Games">
      {/* <GameEntry
        title={
          <>
            GL STD [T1]: Femboy <span>vs</span> Mipin
          </>
        }
        day="Day 13"
        player1={{
          name: "Femboy",
          CO: "blue",
          character: "max",
        }}
        player2={{
          name: "Mipin",
          CO: "orange",
          character: "sami",
        }}
        map="Caustic Finale"
        time="06:23:22 until Clock Expires"
        startDate="01/28/2023"
        ruleSet="Standard (STD) Tier 2"
      /> */}
      {data}
    </Container>
  );
};
