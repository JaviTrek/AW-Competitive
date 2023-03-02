import React from 'react'
import '../style/CurrentGames.sass'
import { SimpleUsername } from './gameInterface/SimpleUsername'

export const CurrentGames = () => {
  return (
    <div className='container'>
      <div className='containerName'>
        Current Games
      </div>
      <div className='containerContent'>
        <article className='currentGame'>
          {/* CG = currentGame */}
          <div className='CGCharacter CGCharacter1'>
            <img src="../images/maxChar.webp" alt="character 1"/>
          </div>
          <div className='CGInfo'>
            <h2 className='CGTitle'>GL STD [T1]: hoochinutz vs Femboy</h2>
            <h3 className='CGSubtitle'><span className='CGSubtitleDay'>Day 13</span>: 06:23:22 until Clock Expires</h3>
            <h4 className='CGMapName'>Caustic Finale</h4>
          </div>
          <div className='CGCharacter CGCharacter2'>
            <img src="../images/samiChar.webp" alt="character 2"/>
          </div>
          <div className='CGUsers'>
            <SimpleUsername name="Femboy" color="blue"/>
            <img className="VSImage" src="../images/vs.png" alt="vs"/>
            <SimpleUsername name="Mipin" color="red"/>
          </div>
        </article>
      </div>
    </div>
  )
}