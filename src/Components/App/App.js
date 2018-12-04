import React, {Component} from 'react'
import './App.css'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: [
        {
          name: 'Auður',
          artist: 'Gunnarsdóttir',
          album: 'Láttu mig vera',
          id: '0'
        },
        {
          name: 'Auður',
          artist: 'Gunnarsdóttir',
          album: 'Dúllan mín',
          id: '1'
        }
      ],
      playlistName: '',
      playlistTracks: [
        {
          name: 'All Star',
          artist: 'Smash Mouth',
          album: 'Veit ekki',
          id: '3'
        }
      ],
      searchTerm: ''
    }
  }
  addTrack = (track) => { //change to arrow function to bind automatically
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    // let pushTracks = this.state.playlistTracks
    // pushTracks.push(track)
    // this.setState({playlistTracks: pushTracks})

    this.setState({playlistTracks: [...this.state.playlistTracks, track]})
  }
  removeTrack = (track) => {
    const trackRemoved = this.state.playlistTracks.filter(trackRemove => track.id !== trackRemove.id)
    this.setState({playlistTracks: trackRemoved})
  }
  updatePlaylistName = (name) => {
    this.setState({playlistName: name})
  }
  savePlaylist = () => {
    //generates an array of uro values called trackURIs from the play property
  }
  search = (searchTerm) => {
    this.setState({searchTerm})
  }
  triggerSearch = async () => {
    const searchResults = await Spotify.search(this.state.searchTerm)
    console.log(searchResults)
     this.setState({searchResults})
  }

  render () {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar onType={this.search} triggerSearch={this.triggerSearch}/>
          <div className='App-playlist'>
            <SearchResults
            searchResults={this.state.searchResults}
            addTrack={this.addTrack} />
            <Playlist
            inputValue={this.state.playlistName}
            onNameChange={this.updatePlaylistName}
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            addTrack={this.addTrack}
            removeTrack={this.removeTrack}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
