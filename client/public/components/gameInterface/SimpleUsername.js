import React from 'react'
import '../../style/gameInterface/simpleUsername.sass'

const usernameColors = {
  "red": {
    gradient: "linear-gradient(90deg, rgba(255, 0, 0, 0.84) 0%, #690000 100%)",
    icon: "../../images/oslogo1.png"
  },
  "blue": {
    gradient: "linear-gradient(90deg, rgba(35, 66, 186, 0.84) 0%, #0B2070 100%)",
    icon: "../../images/oslogo2.png"
  }
}

export const SimpleUsername = ({name="name", color = "red"}) => {
  // color specifies what gradient the background of the username will be

  const style = { "background": usernameColors[color]["gradient"]};
  return (
    <div className="usernameContainer" style={style}>
      <h3>{name}</h3>
      <img className="userContainerIcon" src={usernameColors[color]["icon"]}/>
    </div>
  )
}