import React, {Component} from 'react'
import './SearchResults.css'
import Tracklist from '../Tracklist/Tracklist'

class SearchResults extends Component {
  render () {
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} addTrack={this.props.addTrack} isRemoval={false} />
      </div>
    )
  }
}

export default SearchResults
