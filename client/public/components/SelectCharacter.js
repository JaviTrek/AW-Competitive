import React, { useState, useRef } from "react";
import "../style/SelectCharacter.sass";
import { importAll } from "./util";

export const SelectCharacter = ({selectedCO, setSelectedCO}) => {
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

  // Hooks
  const tempCO = useRef();
  const [hoveredCO, setHoveredCO] = useState("");

  return (
    <div className="characterSection">
      <div className="characterSectionLeft">
        <h2 className="characterSectionTitle">
          Choose your Commanding Officer (CO):
        </h2>
        <p className="characterSectionSubtitle">
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
  );
};
