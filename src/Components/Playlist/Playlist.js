import React, {Component} from 'react'
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist'

class Playlist extends Component {
  handleNameChange = (event) => {
    this.props.onNameChange(event.target.value)
  }

  render () {
    //console.log('this props' + this.props.playlistTracks)
    return (
      <div className='Playlist'>
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        <Tracklist tracks={this.props.playlistTracks}
        addTrack={this.props.addTrack}
        isRemoval
        removeTrack={this.props.removeTrack} />
        <a className='Playlist-save' onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist
