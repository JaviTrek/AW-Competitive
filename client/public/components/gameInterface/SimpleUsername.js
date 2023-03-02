import React from 'react'
import '../../style/gameInterface/simpleUsername.sass'

export const SimpleUsername = ({name, color = "red"}) => {

  // const color = 
  const style = { "background": "linear-gradient(90deg, rgba(35, 66, 186, 0.84) 0%, #0B2070 100%)"};
  return (
    <div className="usernameContainer" style={style}>
      <h3>{name}</h3>
      <img className="userContainerIcon" src="../../images/oslogo2.png"/>
    </div>
  )
}