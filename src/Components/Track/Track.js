import React, {Component} from 'react'
import './Track.css'

class Track extends Component {
  //þarf ekki að hafa constructor því ég nota arrow function til að binda this
  renderAction = () => this.props.isRemoval ? '-' : '+'
  addTrack = () => {
    this.props.addTrack(this.props.track)
  }
  removeTrack = () => {
    this.props.removeTrack(this.props.track)
  }
  render () {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className='Track-action' onClick={this.addTrack}>{this.renderAction()}</a>
        {/* skref 47 add an onClick property to the + element*/}
      </div>
    )
  }
}

export default Track
