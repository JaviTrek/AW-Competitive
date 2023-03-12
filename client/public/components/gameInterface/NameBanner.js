import React from "react";
import "../../style/gameInterface/NameBanner.sass";

export const NameBanner = ({
  name = "name",
  color = "red",
  className,
  onClick,
}) => {
  // color specifies what gradient the background of the username will be
  // valid colors = blue, red
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
