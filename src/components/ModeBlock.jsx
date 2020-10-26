import React, { Component } from 'react';
import VexScale from '../VexScale';

class ModeBlock extends Component {
  render() {
    return (
      <div className=" h-32 m-2 p-2 bg-white border border-gray-400 rounded-lg text-center text-gray-800">
        {this.props.modeName}
        <div id={this.props.modeName}></div>
      </div>
    );
  }
  componentDidMount() {
    VexScale.generateStaff(
      this.props.modeName,
      this.props.pitchCenter,
      this.props.modeCode,
      this.props.absolutePitches
    );
  }
}

export default ModeBlock;
