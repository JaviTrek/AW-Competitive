import React from 'react'
import '../../style/gameInterface/simpleUsername.sass'

export const SimpleUsername = ({name="name", color = "red"}) => {
  // color specifies what gradient the background of the username will be
  // valid colors = blue, red
  return (
    <div className={`usernameContainer ${usernameClassColors[color]}Country`}>
      <h3>{name}</h3>
      <img className="userContainerIcon"/>
    </div>
  )
}