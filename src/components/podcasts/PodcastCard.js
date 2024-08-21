import React from 'react'
import "./podcastCard.css"
import { Link } from 'react-router-dom'

const PodcastCard = ({id, title, displayImage}) => {
  return (
    <Link to={`/podcasts/${id}`}>
    <div className='podcast-card'>
      <img src={displayImage} className='podcast-display'/>
      <p className='podcast-title'>{title}</p>
    </div>
    </Link>
  )
}

export default PodcastCard
