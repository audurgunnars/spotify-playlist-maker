import React, {Component} from 'react'
import './Tracklist.css'
import Track from '../Track/Track'

class Tracklist extends Component {
  render () {
    return (
      <div className='TrackList'>
        {this.props.tracks.map(track => {
          return <Track key={track.id} track={track}
            addTrack={this.props.addTrack} isRemoval={this.props.isRemoval} removeTrack={this.props.removeTrack} />
          { /* skref 34 */ }
        })}
      </div>
    )
  }
}

export default Tracklist
