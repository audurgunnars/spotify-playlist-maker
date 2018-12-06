import React, {Component} from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends Component {
  state = {
    searchResults: [],
    playlistName: '',
    playlistTracks: [],
    searchTerm: '',
  }

  addTrack = track => {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      return
    }
    this.setState({playlistTracks: [...this.state.playlistTracks, track]})
  }
  removeTrack = track => {
    const trackRemoved = this.state.playlistTracks.filter(
      trackRemove => track.id !== trackRemove.id
    )
    this.setState({playlistTracks: trackRemoved})
  }
  updatePlaylistName = name => {
    console.log(name)
    this.setState({playlistName: name})
  }
  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(
      (trackURI, index) => (trackURI = this.state.playlistTracks[index].uri)
    )
    console.log('const track uris', trackURIs)
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    this.setState({playlistName: 'New Playlist'})
    this.setState({playlistTracks: []})
  }
  search = searchTerm => {
    this.setState({searchTerm})
  }
  triggerSearch = async () => {
    const searchResults = await Spotify.search(this.state.searchTerm)
    this.setState({searchResults})
  }

  render() {
    console.log(this.state.playlistTracks)
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onType={this.search} triggerSearch={this.triggerSearch} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              addTrack={this.addTrack}
            />
            <Playlist
              inputValue={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              addTrack={this.addTrack}
              removeTrack={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
