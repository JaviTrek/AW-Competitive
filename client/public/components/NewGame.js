import React from "react";
import { Container } from "./template/Container";

export const NewGame = () => {
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
  const cos = importAll(
    // tells webpack to turn images (.png, .jpeg, .svg) from ../images/co into a dynamic list
    require.context("../images/CO", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <Container title="New Game">
      <div className="characterSection">
        <h2 className="characterSectionTitle">
          Choose your Commanding Officer (CO):
        </h2>
        <p className="characterSectionSubtitle">
          Depending on the character you choose, you will have varying
          abilities/stats. Tier 0 are the strongest while tier 4 are the
          weakest.
        </p>
        <div className="characterSectionGrid">
          <div className="characterTier0">
            <p>Tier 0</p>
            <img src="../images/CO/" alt="" />
          </div>
          <div className="characterTier1"></div>
          <div className="characterTier2"></div>
          <div className="characterTier3"></div>
          <div className="characterTier4"></div>
        </div>
      </div>
    </Container>
  );
};
