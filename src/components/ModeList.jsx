import React, { Component } from 'react';
import Music from '../Music';

class ModeList extends Component {
  generateResults() {
    let scale = this.props.keysPressed
      .map((el, i) => (el ? i : null))
      .filter((el) => el != null);
    return Music.generateModes(
      this.props.tones,
      scale,
      this.props.root
    ).map((el) => <div>{el.getAbsoluteModeCode()}</div>);
  }

  render() {
    return <div className="flex-1 text-center">{this.generateResults()}</div>;
  }
}

export default ModeList;
