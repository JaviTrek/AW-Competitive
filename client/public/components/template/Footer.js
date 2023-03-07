import React from 'react'
import awLogo from '../../images/awLogo.webp'
import ghLogo from '../../images/footerImages/GitHub.png'
import rLogo from '../../images/footerImages/Reddit.png'
import dLogo from '../../images/footerImages/Discord.png'

export const Footer = () => {
  return (

    <div className='footer'>
      <div className = 'footerGrid'>

        <div className = 'logoElementGridF'> 
           <img className ='imageLogo' src ={awLogo} alt=""/>
        </div>

        <nav className = 'menuElementGridF'>  
          <div className = 'menuButtonElementGridF'> Home </div>
          <div className = 'menuButtonElementGridF'> About us </div>
          <div className = 'menuButtonElementGridF'> Terms of Use </div>
          <div className = 'menuButtonElementGridF'> Rules </div>
        </nav>

        <nav className = 'iconElements'>
          <img className = 'iconButtonElementGridRedditF'src ={rLogo} alt=""/>
          <img className = 'iconButtonElementGridDiscordF'src ={dLogo} alt=""/>
          <img className = 'iconButtonElementGridGhF'src ={ghLogo} alt=""/>
        </nav>

        <div className = 'horizontalLine'> </div>

        <p className = 'copyrightElement'> Advance Wars is (c) 1990-2001 Nintendo and (c) 2001 Intelligent Systems. All images are copyright their respective owners.</p>
      </div>
      
    </div>

  )
}

