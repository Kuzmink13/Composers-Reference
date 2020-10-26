import React, { Component } from 'react';
import VexScale from '../VexScale';

class Staff extends Component {
  state = {};
  render() {
    return <div id={this.props.modeName}></div>;
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

export default Staff;
