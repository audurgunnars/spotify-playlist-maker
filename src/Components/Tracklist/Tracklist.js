import React, {Component} from 'react'
import './Tracklist.css'
import Track from '../Track/Track'

class Tracklist extends Component {
  render () {
    return (
      <div className='TrackList'>
        {this.props.tracks.map(track => {
          return <Track key={track.id} onAdd={this.props.onAdd} track={track}
            addTrack={this.props.addTrack} isRemoval={this.props.isRemoval} onRemove={this.props.removeTrack} />
          { /* skref 34 */ }
        })}
      </div>
    )
  }
}

export default Tracklist
