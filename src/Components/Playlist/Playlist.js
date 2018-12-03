import React, {Component} from 'react'
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist'

class Playlist extends Component {
  handleNameChange = (e) => {
    this.props.onNameChange(e.target.value)
  }
  
  render () {
    return (
      <div className='Playlist'>
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        <Tracklist tracks={this.props.playlistTracks} addTrack={this.props.addTrack} isRemoval onRemove={this.props.removeTrack} />
        <a className='Playlist-save'>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist
