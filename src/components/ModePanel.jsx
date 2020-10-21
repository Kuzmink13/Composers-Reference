import React, { Component } from 'react';
import ModeList from './ModeList';

class ModePanel extends Component {
  getModeList(tonality, index) {
    return (
      <ModeList
        key={index}
        tones={tonality}
        keysPressed={this.props.keysPressed}
        root={this.props.root}
      />
    );
  }

  render() {
    const tonalities = [
      [0, 2, 4, 6, 8, 10],
      [0, 2, 4, 5, 7, 9, 11],
      [0, 2, 3, 5, 7, 9, 11],
      [0, 1, 3, 4, 6, 7, 9, 10],
    ];
    return (
      <div className="flex-grow flex px-6">
        {this.props.isWide
          ? tonalities.map((el, i) => this.getModeList(el, i))
          : this.getModeList(tonalities[this.props.tonalitySelector])}
      </div>
    );
  }
}

export default ModePanel;
