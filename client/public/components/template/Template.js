import React from 'react'
import { Outlet } from "react-router-dom";
import { Header } from './Header';
import { Footer } from './Footer';
import '../../style/template/template.sass';

// This component is the template for all other pages
// Includes Background, Header, and Footer
export const Template = () => {
  return (
    <React.Fragment>
      <Header />
      <div className='template'>
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
}
