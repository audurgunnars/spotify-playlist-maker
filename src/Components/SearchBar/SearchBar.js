import React, {Component} from 'react'
import './SearchBar.css'

class SearchBar extends Component {
  handleTermChange = event => {
    this.props.onType(event.target.value)
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
        />
        <a onClick={this.props.triggerSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar
