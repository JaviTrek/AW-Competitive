import React, {useState} from 'react'
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

export const ScreenShotContainer = () =>{

    const [current, setCurrent] = useState(0); // Middle image
    const [current1, setCurrent1] = useState(1); // image right 1 (right image next to center)
    const [current2, setCurrent2] = useState(2); // image right 2 (farthest to the right)
    const [current3, setCurrent3] = useState(3); // image left 2 (farthest to the left)
    const [current4, setCurrent4] = useState(4); // image left 1 (left image next to center)

    const [hovered, setHovered] = useState(false);
    const [hovered1, setHovered1] = useState(false);
    const [hovered2, setHovered2] = useState(false);
    const [hovered3, setHovered3] = useState(false);
    const [hovered4, setHovered4] = useState(false);

    let screenShots = [sh1, sh2, sh3, sh4, sh5];
    let dot = [dotIndicator, dotIndicator2]

    const length = screenShots.length;
    
    const nextPic = () =>{
        setCurrent(current === length -1  ? 0 : current +1 )
        setCurrent1(current1 === length -1  ? 0 : current1 +1)
        setCurrent2(current2 === length -1  ? 0 : current2 +1)

        setCurrent4(current4 === length -1  ? 0 : current4 +1)//  image penultiamte to the left

        setCurrent3(current3 === length -1  ? 0 : current3 +1) // image all the way on the left
    }

    const prevPic = () =>{
        setCurrent(current === 0  ? length-1 : current -1 )
        setCurrent1(current1 === 0  ? length-1 : current1 -1 )
        setCurrent2(current2 === 0  ? length-1 : current2 -1 )
        setCurrent3(current3 === 0  ? length-1 : current3 -1 )
        setCurrent4(current4 === 0  ? length-1 : current4 -1 )     
    }
 
    const setImage = () =>{
        setCurrent(0)
        setCurrent1(1)
        setCurrent2(2)
        setCurrent3(3)
        setCurrent4(4)
    }
    const setImage1 = () =>{
        setCurrent(1)
        setCurrent1(2)
        setCurrent2(3)
        setCurrent3(4)
        setCurrent4(0)
    }
    const setImage2 = () =>{
        setCurrent(2)
        setCurrent1(3)
        setCurrent2(4)
        setCurrent3(0)
        setCurrent4(1)
    }
    const setImage3 = () =>{
        setCurrent(3)
        setCurrent1(4)
        setCurrent2(0)
        setCurrent3(1)
        setCurrent4(2)
    }
    const setImage4 = () =>{
        setCurrent(4)
        setCurrent1(0)
        setCurrent2(1)
        setCurrent3(2)
        setCurrent4(3)
    }


    return(
        <div className='scrnShotBox'>   
            <div className='ssbTitleContainer'>
                <h1 className='ssbTitle'> Screenshots </h1>
            </div>        
                
            <div className = 'screenshotContainer'>

                <img className = 'centerImage' src ={screenShots[current]} alt=""/>
                <img className = 'right2Image' src ={screenShots[current1]} alt=""/>
                <img className = 'right1Image' src ={screenShots[current2]} alt=""/>

                <img className = 'left1Image' src ={screenShots[current3]} alt=""/>
                <img className = 'left2Image' src ={screenShots[current4]} alt=""/>
                

            </div>

            <div className='sliderContainer'>
                <div className='slider'>

                    <img className = 'leftSlider' src = {sliderL} onClick={prevPic}/>

                    <img className = 'dotIndic' src = {hovered ? dotIndicator : dotIndicator2} 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)} 
                    onClick={setImage}/>

                    <img className = 'dotIndic' src = {hovered1 ? dotIndicator : dotIndicator2} 
                    onMouseEnter={() => setHovered1(true)} 
                    onMouseLeave={() => setHovered1(false)}  
                    onClick={setImage1}/>

                    <img className = 'dotIndic' src = {hovered2 ? dotIndicator : dotIndicator2} 
                    onMouseEnter={() => setHovered2(true)} 
                    onMouseLeave={() => setHovered2(false)}  
                    onClick={setImage2}/>

                    <img className = 'dotIndic' src = {hovered3 ? dotIndicator : dotIndicator2} 
                    onMouseEnter={() => setHovered3(true)} 
                    onMouseLeave={() => setHovered3(false)}  
                    onClick={setImage3}/>

                    <img className = 'dotIndic' src = {hovered4 ? dotIndicator : dotIndicator2}
                    onMouseEnter={() => setHovered4(true)} 
                    onMouseLeave={() => setHovered4(false)}
                    onClick={setImage4}/>
                    
                    <img className = 'rightSlider' src = {sliderR} alt ="" onClick={nextPic}/>    
                </div>
            </div>  
            
        </div>  
    )
}