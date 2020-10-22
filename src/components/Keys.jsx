import React, { Component } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

class Keys extends Component {
  generateKeys() {
    return Utilities.noteNames.map((el, i) => (
      <Key
        key={i}
        noteIndex={i}
        noteName={el}
        noteNamesOn={this.props.noteNamesOn}
        root={this.props.root}
        pressed={this.props.keysPressed[i]}
        handlePress={this.props.handlePress}
        handleRootPress={this.props.handleRootPress}
      />
    ));
  }

  render() {
    return (
      <div className="p-8 flex flex-row justify-center h-auto border-b border-gray-400">
        <div className="flex flex-row">
          <div className="flex flex-row">{this.generateKeys()}</div>
          <div className="hidden sm:flex flex-row">{this.generateKeys()}</div>
          <div className="hidden lg:flex flex-row">{this.generateKeys()}</div>
        </div>
      </div>
    );
  }
}

export default Keys;