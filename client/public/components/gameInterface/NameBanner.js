import React from "react";
import "../../style/gameInterface/NameBanner.sass";

export const NameBanner = ({
  name = "name",
  color = "orange",
  className,
  onClick,
}) => {
  // color specifies what gradient the background of the username will be
  // valid colors = blue, orange, green, yellow
  return (
    <div
      className={`usernameContainer ${color}Country ${className}`}
      onClick={onClick}
    >
      <h3>{name}</h3>
      <div className="userContainerIcon"></div>
    </div>
  );
};
