import React from 'react';
//import logo from './images/awLogo.webp';

export const Header = () => {
  return (
    <div className='header'>
      <div className='headerGrid'> 

        <div>
          <img className='pictureElement' src = "/images/awLogo.webpg" alt=""/>
        </div>

        <div className='menuElementGrid'>
          <div className='menuElementGridButton'> Competition</div>
          <div className='menuElementGridButton'> How to play</div>
          <div className='menuElementGridButton'> Community</div>
          <div className='menuElementGridButton'> Tools</div>
        </div>

        <div className = 'loginContainer'>
          <div className='menuElementGridLogin'> Login</div>
        </div>

      </div>

    </div>

    
  )
}
