import React from "react";
import "../../style/template/Container.sass";

export const Container = ({ title, children }) => {
  return (
    <div className="container">
      <div className="containerName">{title}</div>
      <div className="containerContent">{children}</div>
    </div>
  );
};
