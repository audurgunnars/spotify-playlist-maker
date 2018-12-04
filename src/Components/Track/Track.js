import React, {Component} from 'react'
import './Track.css'

class Track extends Component {
  renderAction = () => this.props.isRemoval ? '-' : '+'
  triggerTrack = () => {
    this.props.isRemoval ? this.props.removeTrack(this.props.track) : this.props.addTrack(this.props.track)
  }
  render () {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist || this.props.track.artists[0].name} | {this.props.track.album.name}</p>
        </div>
        <a className='Track-action' onClick={this.triggerTrack}>{this.renderAction()}</a>
      </div>
    )
  }
}

export default Track
