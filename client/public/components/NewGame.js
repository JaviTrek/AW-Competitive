import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "./template/Container";
import { NameBanner } from "./gameInterface/NameBanner";
import "../style/NewGame.sass";
import "../style/Animations.sass";
import axios from "axios";

// *Importing all the CO images to variable cos*
// resources:
// https://stackoverflow.com/questions/54059179/what-is-require-context
// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
// example use:
// <img src={cos["Adder-Full.png"]} />;
function importAll(r) {
  let images = {};
  // For every image:
  // item = "./Adder-Full.png" => "Adder-Full.png"
  // r(item) = "/cc17d941af409f6fabd1.png"
  // images["Adder-Full.png"] == "/cc17d941af409f6fabd1.png"
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

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

  const cos = importAll(
    // tells webpack to turn images (.png, .jpeg, .svg) from ../images/co into a dynamic list
    require.context("../images/CO", false, /\.(png|jpe?g|svg)$/)
  );
  const tier0 = ["Sensei", "Sturm", "Colin", "Grit", "Kanbei", "Hachi"];
  const tier1 = ["Hawke", "Sasha", "Von Bolt", "Nell", "Javier"];
  const tier2 = ["Drake", "Eagle", "Kindle", "Olaf", "Rachel", "Sami"];
  const tier3 = ["Max", "Andy", "Lash"];
  const tier4 = [
    "Jake",
    "Sonja",
    "Adder",
    "Jess",
    "Jugger",
    "Flak",
    "Grimm",
    "Koal",
  ];
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
  const imgMapping = (img) => (
    <img
      key={img}
      className={`
      ${selectedCO == img ? "selectedCO" : ""} 
      ${img == "Sami" || img == "Max" ? "" : "unavailable"}
      `}
      onClick={() => setSelectedCO(img)}
      src={cos[`${img}-Small.png`]}
      onMouseEnter={() => {
        tempCO.current = selectedCO;
        setHoveredCO(img);
      }}
      onMouseLeave={() => {
        setHoveredCO("");
      }}
      alt={`${img} small image`}
    />
  );
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
  const tempCO = useRef();
  const [hoveredCO, setHoveredCO] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Orange Star");
  const [selectedMap, setSelectedMap] = useState("Caustic-Finale");
  const tempMap = useRef();
  const [hoveredMap, setHoveredMap] = useState("");

  let currentCountryCamelCase =
    selectedCountry.charAt(0).toLowerCase() +
    selectedCountry.slice(1).replace(/ /g, "");

  return (
    <Container title="New Game">
      <div className="newGameSection characterSection">
        <div className="characterSectionLeft">
          <h2 className="newGameSectionTitle">
            Choose your Commanding Officer (CO):
          </h2>
          <p className="newGameSectionSubtitle">
            Depending on the character you choose, you will have varying
            abilities/stats. Tier 0 are the strongest while tier 4 are the
            weakest.
          </p>
          <div className="characterSectionGrid">
            <div className="characterTier">
              <p>Tier 0</p>
              {tier0.map(imgMapping)}
            </div>
            <div className="characterTier">
              <p>Tier 1</p>
              {tier1.map(imgMapping)}
            </div>
            <div className="characterTier">
              <p>Tier 2</p>
              {tier2.map(imgMapping)}
            </div>
            <div className="characterTier">
              <p>Tier 3</p>
              {tier3.map(imgMapping)}
            </div>
            <div className="characterTier">
              <p>Tier 4</p>
              {tier4.map(imgMapping)}
            </div>
          </div>
        </div>

        {hoveredCO ? (
          <div className="characterDisplay">
            <h3>{hoveredCO}</h3>
            <img
              className="fullCharacterImage"
              src={cos[`${hoveredCO}-Full.png`]}
              alt={`full image of ${hoveredCO}`}
            />
          </div>
        ) : (
          <div className="characterDisplay">
            <h3>{selectedCO}</h3>
            <img
              className="fullCharacterImage"
              src={cos[`${selectedCO}-Full.png`]}
              alt={`full image of ${selectedCO}`}
            />
          </div>
        )}
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
