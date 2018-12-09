import React, {Component} from 'react'
import './SearchBar.css'

class SearchBar extends Component {
  keyPress = event => {
    const code = event.keyCode || event.which
    if(code === 13) this.props.triggerSearch()    
  }
  handleTermChange = event => {
    this.props.onType(event.target.value)
  }
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          onKeyPress={this.keyPress}
        />
        <a onClick={this.props.triggerSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar
