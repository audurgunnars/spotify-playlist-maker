import React, {Component} from 'react'
import './SearchResults.css'
import Tracklist from '../Tracklist/Tracklist'

class SearchResults extends Component {
  render () {
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} /* skref 43 */ />
        {/* nr.33 Stóð áður add a tracklist component */}
      </div>
    )
  }
}

export default SearchResults
