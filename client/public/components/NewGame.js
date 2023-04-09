import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./template/Container";
import { NameBanner } from "./gameInterface/NameBanner";
import { SelectCharacter } from "./SelectCharacter";
import { importAll } from "./util";
import "../style/NewGame.sass";
import "../style/Animations.sass";
import axios from "axios";

export const NewGame = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/authenticateUser")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        navigate("/login");
      });
  }, []);

  const countries = {
    "Orange Star": "orange",
    "Blue Moon": "blue",
    "Yellow Comet": "yellow",
    "Green Earth": "green",
  };
  // Map example:
  // Amber-Valley-Layout
  // Amber-Valley-Preview
  // Amber-Valley-Small
  const maps = importAll(
    require.context("../images/mapTiles/full", false, /\.(png|jpe?g|svg)$/)
  );
  const mapNames = [
    "Amber-Valley",
    "Caustic-Finale",
    "Darkling-Treshold",
    "Defiled-Logic",
  ];

  // Mapping functions
  const mapMapping = (map) => (
    <div
      key={map}
      className="mapOption"
      onClick={() => setSelectedMap(map)}
      onMouseEnter={() => {
        tempMap.current = selectedMap;
        setHoveredMap(map);
      }}
      onMouseLeave={() => {
        setHoveredMap("");
      }}
    >
      <img
        className={`
        ${selectedMap == map ? "selectedMap" : ""} 
        ${map == "Caustic-Finale" ? "" : "unavailable"}
        `}
        src={maps[`${map}-Small.png`]}
        alt={`${map} small image`}
      />
      <p>{map.replace(/-/g, " ")}</p>
    </div>
  );

  // Hooks
  const [selectedCO, setSelectedCO] = useState("Max");
  const [selectedCountry, setSelectedCountry] = useState("Orange Star");
  const [selectedMap, setSelectedMap] = useState("Caustic-Finale");
  const tempMap = useRef();
  const [hoveredMap, setHoveredMap] = useState("");

  let currentCountryCamelCase =
    selectedCountry.charAt(0).toLowerCase() +
    selectedCountry.slice(1).replace(/ /g, "");

  return (
    <Container title="New Game">
      <div className="newGameSection">
        <SelectCharacter
          selectedCO={selectedCO}
          setSelectedCO={setSelectedCO}
        />
      </div>

      <div className="newGameSection">
        <h2 className="newGameSectionTitle">Choose Your Country:</h2>
        <p className="newGameSectionSubtitle">
          A unique color that identifies you on the battlefield.
        </p>
        <div className="countryGrid">
          {Object.keys(countries).map((key) => (
            <NameBanner
              key={key}
              onClick={() => setSelectedCountry(key)}
              className={`
              ${selectedCountry == key ? "selectedCountry" : ""} 
              ${key == "Orange Star" || key == "Blue Moon" ? "" : "unavailable"}
              `}
              name={key}
              color={countries[key]}
            />
          ))}
        </div>
        <div className="gameUnitsContainer">
          <div className={`${currentCountryCamelCase}Infantry bigGameUnit`} />
          <div className={`${currentCountryCamelCase}Tank bigGameUnit`} />
          <div className={`${currentCountryCamelCase}B-Copter bigGameUnit`} />
          <div className={`${currentCountryCamelCase}Carrier bigGameUnit`} />
          <div className={`${currentCountryCamelCase}Sub bigGameUnit`} />
          <div className={`${currentCountryCamelCase}NeoTank bigGameUnit`} />
        </div>
      </div>

      <div className="newGameSection">
        <h2 className="newGameSectionTitle">Choose The Map:</h2>
        <p className="newGameSectionSubtitle">
          The area the game will be played on. Each map has varying degrees of
          land coverage and water coverage. There are also obstacles that
          inhibits certain units’ traversal. Keep in mind the dynamic of the
          game changes wildly across maps.
        </p>
        <div className="mapSelections">{mapNames.map(mapMapping)}</div>
        <div>
          <h3 className="mapPreviewTitle">Preview:</h3>
          {hoveredMap ? (
            <div className="mapPreview">
              <img
                className="mapPreviewImage"
                src={maps[`${hoveredMap}-Preview.jpg`]}
                alt={`full image of ${hoveredMap}`}
              />
              <h3>{hoveredMap.replace(/-/g, " ")}</h3>
            </div>
          ) : (
            <div className="mapPreview">
              <img
                className="mapPreviewImage"
                src={maps[`${selectedMap}-Preview.jpg`]}
                alt={`full image of ${selectedMap}`}
              />
            </div>
          )}
        </div>
      </div>

      <p className="disclaimerText">
        Pressing play will first look for a game with the same map selected
        above and an opposing player with a country color different from the one
        selected above. If none are found, the game will be created and wait for
        an opponent to join.
      </p>

      <div
        onClick={() => {
          console.log(selectedCO);
          console.log(selectedCountry);
          console.log(selectedMap);
          const data = {
            selectedCO: selectedCO,
            selectedCountry: selectedCountry,
            selectedMap: selectedMap,
          };
          axios
            .post("/createNewGame", data, null)
            .then((res) => {
              navigate("/startGames");
            })
            .catch((err) => {
              console.error(err);
            });
        }}
        className="btn btn-big"
      >
        PLAY
      </div>
    </Container>
  );
};
