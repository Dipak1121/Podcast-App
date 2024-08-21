import React from 'react'
import Button from '../commonComponents/button/Button'
import "./episodesDetails.css"

const EpisodesDetails = ({title, description, audio, onClick}) => {
  return (
    <div className='episode'>
      <h3 style={{textAlign:"left", marginBottom: "0px"}}>{title}</h3>
      <p style={{textAlign:"left", marginTop: "12px", marginBottom:"12px", marginLeft:"12px"}}>{description}</p>
      <Button text={"play"} onClick={() => onClick(audio)} />
    </div>
  )
}

export default EpisodesDetails
