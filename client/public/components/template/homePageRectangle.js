import React from "react";
import "../../style/template/rectangle.sass";
//import RectImage from '../../images/homePageImages/rectangleImage1.png'
//import UnitPic from '../../images/homePageImages/lilDudeIm.png'

//The parameters are called.... uh.... give me a sec... props
export const RectangleInfo = ({
  className = "",
  title = "",
  paragraph = "",
  icon = { UnitPic },
  halfImage = { reactImage },
}) => {
  return (
    <div className={`rectangle ${className}`}>
      <div className="textHalf">
        <div className="titleImage">
          <h1 className="header1">Easy to play</h1>
          <div className="unitImgGrid">
            <img className="unitImag" src={icon} alt="" />
          </div>
        </div>

        <h2 className="header2">{title}</h2>
        <p className="paragraph">{paragraph}</p>

        
      </div>
      <div className="imageHalf">
        <img className="image10" src={halfImage} alt="" />
      </div>
    </div>
  );
};