import React, {Component} from 'react'
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist'

class Playlist extends Component {
  handleNameChange = event => {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input
          placeholder="New Playlist"
          id="newplaylist"
          value={this.props.playlistName}
          onChange={this.handleNameChange}
        />
        <Tracklist
          tracks={this.props.playlistTracks}
          addTrack={this.props.addTrack}
          isRemoval
          removeTrack={this.props.removeTrack}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    )
  }
}

export default Playlist
