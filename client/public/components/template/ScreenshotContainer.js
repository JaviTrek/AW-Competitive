import React, { useState } from "react";
import "../../style/template/Screenshot.sass";
import sh1 from "../../images/ScreenshotsImages/screenshot1.png";
import sh2 from "../../images/ScreenshotsImages/screenshot2.png";
import sh4 from "../../images/ScreenshotsImages/screenshot3.png";
import sh3 from "../../images/ScreenshotsImages/screenshot4.png";
import sh5 from "../../images/ScreenshotsImages/screenshot5.png";
import sliderL from "../../images/ScreenshotsImages/imageSliderL.png";
import sliderR from "../../images/ScreenshotsImages/imageSliderR.png";
import dotIndicator from "../../images/ScreenshotsImages/dotIndicator1.png";
import dotIndicator2 from "../../images/ScreenshotsImages/dotIndicator2.png";

export const ScreenShotContainer = () => {
  let screenShots = [sh1, sh2, sh3, sh4, sh5];
  const length = screenShots.length;
  let dot = [dotIndicator, dotIndicator2];

  // each number is a image container
  const [images, setImages] = useState([0, 1, 2, 3, 4]);
  const [hovered, setHovered] = useState(-1);

  const nextPic = () => {
    const tmp = [];
    images.forEach(function (image) {
      tmp.push(image === length - 1 ? 0 : image + 1);
    });
    console.log(images);
    setImages(tmp);
    console.log(images);
  };

  const prevPic = () => {
    const tmp = [];
    images.forEach(function (image) {
      tmp.push(image === 0 ? length - 1 : image - 1);
    });
    setImages(tmp);
  };

  const setImage = () => {
    setImages([0, 1, 2, 3, 4]);
  };
  const setImage1 = () => {
    setImages([1, 2, 3, 4, 0]);
  };
  const setImage2 = () => {
    setImages([2, 3, 4, 0, 1]);
  };
  const setImage3 = () => {
    setImages([3, 4, 0, 1, 2]);
  };
  const setImage4 = () => {
    setImages([4, 0, 1, 2, 3]);
  };

  return (
    <div className="scrnShotBox">
      <div className="ssbTitleContainer">
        <h1 className="ssbTitle"> Screenshots </h1>
      </div>

      <div className="screenshotContainer">
        <img className="centerImage" src={screenShots[images[0]]} alt="" />
        <img className="right2Image" src={screenShots[images[1]]} alt="" />
        <img className="right1Image" src={screenShots[images[2]]} alt="" />
        <img className="left1Image" src={screenShots[images[3]]} alt="" />
        <img className="left2Image" src={screenShots[images[4]]} alt="" />
      </div>

      <div className="sliderContainer">
        <div className="slider">
          <img className="leftSlider" src={sliderL} onClick={prevPic} />

          <img
            className="dotIndic"
            src={hovered == 0 || images[0] == 0 ? dotIndicator : dotIndicator2}
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(-1)}
            onClick={setImage}
          />

          <img
            className="dotIndic"
            src={hovered == 1 || images[0] == 1 ? dotIndicator : dotIndicator2}
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(-1)}
            onClick={setImage1}
          />

          <img
            className="dotIndic"
            src={hovered == 2 || images[0] == 2 ? dotIndicator : dotIndicator2}
            onMouseEnter={() => setHovered(2)}
            onMouseLeave={() => setHovered(-1)}
            onClick={setImage2}
          />

          <img
            className="dotIndic"
            src={hovered == 3 || images[0] == 3 ? dotIndicator : dotIndicator2}
            onMouseEnter={() => setHovered(3)}
            onMouseLeave={() => setHovered(-1)}
            onClick={setImage3}
          />

          <img
            className="dotIndic"
            src={hovered == 4 || images[0] == 4 ? dotIndicator : dotIndicator2}
            onMouseEnter={() => setHovered(4)}
            onMouseLeave={() => setHovered(-1)}
            onClick={setImage4}
          />

          <img className="rightSlider" src={sliderR} alt="" onClick={nextPic} />
        </div>
      </div>
    </div>
  );
};
