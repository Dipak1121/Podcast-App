import React from 'react'
import Header from '../components/commonComponents/header/Header'
import CreatePodcastForm from '../components/createPodcast/CreatePodcastForm'
const CreatePodcastPage = () => {
  return (
    <div>
      <Header />
      <div className='wrapper-input'>
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  )
}

export default CreatePodcastPage
