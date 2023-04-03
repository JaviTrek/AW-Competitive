import React from "react";
import { Container } from "./template/Container";
import { GameEntry } from "./GameEntry";

export const CurrentGames = () => {
  return (
    <Container title="Current Games">
      <GameEntry
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
      />
    </Container>
  );
};
