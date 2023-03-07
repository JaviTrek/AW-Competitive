import React from 'react'
import '../../style/currentPlayer.sass'
import IMG from '../../images/maxChar.webp'



const CurrentPlayer = () => {
  return (
    <div className='current-player'>
      <div className='header'>
        <div className='header-background'>
          <div className='character-background'>xxx</div>
        </div>
      </div>
      <div className='player-name'>3</div>
      <div className='player-stats'>
        4
      </div>
    </div>
  )
}

export default CurrentPlayer
