import React from "react";
import "../../style/template/rectangle.sass";
import "../../style/Animations.sass";
//import RectImage from '../../images/homePageImages/rectangleImage1.png'
//import UnitPic from '../../images/homePageImages/lilDudeIm.png'

//The parameters are called.... uh.... give me a sec... props
export const RectangleInfo = ({
  className = "",
  title = "",
  paragraph = "",
  icon = { UnitPic },
  halfImage = { reactImage },
  children
}) => {
  return (
    <div className={`rectangle ${className}`}>
      <div className="textHalf">
        <div className={`rectangleUnitImage ${icon}`} />
        <h2 className="rectangleSubtitleHeader">Easy to play</h2>
        <h1 className="rectangleTitleHeader">{title}</h1>
        <p className="rectangleParagraph">{paragraph}</p>
        {children}
      </div>
      <div className="imageHalf">
        <img className="image10" src={halfImage} alt="" />
      </div>
    </div>
  );
};
