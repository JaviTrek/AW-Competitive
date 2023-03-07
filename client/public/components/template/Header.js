import React from 'react';
import logo from '../../images/awLogo.webp';
import '../../style/template/header.sass'

export const Header = () => {
  return (
    <header className='header'> 

        <a href="/">
          <img className='headerLogo' src={logo} alt="header logo"/>
        </a>

        <nav className='headerMenu'>
          <a className='headerNav headerMenuButton'> Competition</a>
          <a className='headerNav headerMenuButton'> How to play</a>
          <a className='headerNav headerMenuButton'> Community</a>
          <a className='headerNav headerMenuButton'> Tools</a>
        </nav>

        <div className='headerNav loginButton'> Login</div>

    </header>
    
  )
}
