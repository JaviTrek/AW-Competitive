import React from "react";
import "../../style/template/Container.sass";

export const Container = ({ title, children, size = "medium", styles }) => {
  const sizes = {
    medium: "container-medium",
    small: "container-small",
  };
  const containerSize = sizes[size];
  console.log(styles);
  return (
    <div className={`container ${containerSize} ${styles}`}>
      <div className="containerName">{title}</div>
      <div className="containerContent">{children}</div>
    </div>
  );
};
