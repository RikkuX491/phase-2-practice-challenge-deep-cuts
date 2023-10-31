import React from 'react'
import Search from './Search'
import AddTrackForm from './AddTrackForm'
import TracksList from './TracksList'
import {useState, useEffect} from 'react'

function TracksPage() {

  const [tracks, setTracks] = useState([])
  const [formData, setFormData] = useState({})
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    fetch("http://localhost:8001/tracks")
    .then(response => response.json())
    .then(tracksData => {
      setTracks(tracksData)
    })
  }, [])

  function addTrack(event){
    event.preventDefault()
    
    fetch('http://localhost:8001/tracks', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newTrack => {
      setTracks([...tracks, newTrack])
    })
  }

  function updateFormData(event){
    if(event.target.name === 'BPM'){
      setFormData({...formData, [event.target.name]: Number(event.target.value)})  
    }
    else{
      setFormData({...formData, [event.target.name]: event.target.value})
    }
  }

  function updateSearchText(event){
    setSearchText(event.target.value)
  }

  const filteredTracks = tracks.filter((track) => {
    return track.title.toLowerCase().includes(searchText.toLowerCase()) || track.artist.toLowerCase().includes(searchText.toLowerCase())
  })
    
  return (
    <div>
      <Search updateSearchText={updateSearchText} />
      <AddTrackForm addTrack={addTrack} updateFormData={updateFormData} />
      <TracksList tracks={filteredTracks} />
    </div>
  )
}

export default TracksPage