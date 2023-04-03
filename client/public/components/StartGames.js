import React from "react";
import { Container } from "./template/Container";
import { GameEntry } from "./GameEntry";

export const StartGames = () => {
  return (
    <Container title="Pending Games">
      <GameEntry
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
      />
    </Container>
  );
};
