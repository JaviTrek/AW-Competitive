import React, {useState} from 'react'
import "../../style/template/Screenshot.sass";
import sh1 from "../../images/ScreenshotsImages/screenshot1.png";
import sh2 from "../../images/ScreenshotsImages/screenshot2.png";
import sh3 from "../../images/ScreenshotsImages/screenshot3.png";
import sh5 from "../../images/ScreenshotsImages/screenshot4.png";
import sh4 from "../../images/ScreenshotsImages/screenshot5.png";
import sliderL from "../../images/ScreenshotsImages/imageSliderL.png";
import sliderR from "../../images/ScreenshotsImages/imageSliderR.png";
import dotIndicator from "../../images/ScreenshotsImages/dotIndicator1.png";

export const ScreenShotContainer = () =>{

    const [current, setCurrent] = useState(0);
    const [current1, setCurrent1] = useState(1);
    const [current2, setCurrent2] = useState(2);
    const [current3, setCurrent3] = useState(3);
    const [current4, setCurrent4] = useState(4);
    const screenShots = [ sh1, sh2, sh3, sh4, sh5];

    const length = screenShots.length;
      

    const nextPic = () =>{
        setCurrent( current === length -1  ? 0 : current +1 )
        setCurrent1(current1 === length -1  ? 0 : current1 +1)
        setCurrent2(current2 === length -1  ? 0 : current2 +1)
        setCurrent3(current3 === length -1  ? 0 : current3 +1)
        setCurrent4(current4 === length -1  ? 3 : current4 -1)
        console.log(current4)
    }

    const prevPic = () =>{
        setCurrent( current === 0 ? length-1 : current-1)
       
        setCurrent1(2)
        
    }

    
    const setImage = () =>{
        setCurrent(0)
    }


    return(
        <div className='scrnShotBox'>
            <h1 className='ssbTitle'> Screenshots </h1>    
            <div className = 'screenshotContainer'>
                <img className = 'centerImage' src ={screenShots[current]} alt=""/>
                <img className = 'rightOutImage' src ={screenShots[current1]} alt=""/>
                <img className = 'leftInImage' src ={screenShots[current2]} alt=""/>
                <img className = 'rightOutImage' src ={screenShots[current3]} alt=""/>
                <img className = 'leftOutImage' src ={screenShots[current4]} alt=""/>
            </div>

            <div className='bruh'>
                <img className = 'leftSlider' src = {sliderL} alt ="" onClick={prevPic}/>
                <img className = 'dotIndic' src = {dotIndicator} alt ="" onClick={setImage}/>
                <img className = 'dotIndic' src = {dotIndicator} alt ="" onClick={setImage}/>
                <img className = 'dotIndic' src = {dotIndicator} alt ="" onClick={setImage}/>
                <img className = 'dotIndic' src = {dotIndicator} alt ="" onClick={setImage}/>
                <img className = 'dotIndic' src = {dotIndicator} alt ="" onClick={setImage}/>
                <img className = 'rightSlider' src = {sliderR} alt ="" onClick={nextPic}/>    
            </div>
        </div>  
    )
}