import React from "react";
import "../../style/template/Container.sass";
import logo from "../../images/awLogo.webp";
import xicon from "../../images/template/XIcon.png";

export const Container = ({ title, children, className, subtitle }) => {
  return (
    <div className={`container container-medium ${className}`}>
      <div className="containerName">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>

      <div className="containerContent">{children}</div>
    </div>
  );
};

export const SmallContainer = ({ title, children, className }) => {
  return (
    <div className={`container container-small ${className}`}>
      <img className="containerLogo" src={logo} alt="website logo" />
      <a href="/">
        <img
          tabIndex={0}
          className="xIcon"
          src={xicon}
          alt="X button to go back"
        />
      </a>
      <h1 className="containerName">{title}</h1>
      {children}
    </div>
  );
};
