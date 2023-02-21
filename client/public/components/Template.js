import React from 'react'
import { Outlet } from "react-router-dom";

// This component is the template for all other pages
// Includes Background, Header, and Footer
export const Template = () => {
  return (
    <React.Fragment>
      <h1>Title</h1>
      <div className='template'>
        <Outlet />
      </div>
      <h2>Footer</h2>
    </React.Fragment>
  );
}
