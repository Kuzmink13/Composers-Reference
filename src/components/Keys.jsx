import React, { Component } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

class Keys extends Component {
  generateKeys() {
    return Utilities.noteNamesSharp.map((el, i) => (
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
      <div className="mx-8 p-8 flex flex-row justify-center border-b border-gray-400">
        <div className="flex flex-row">{this.generateKeys()}</div>
        <div className="hidden sm:flex flex-row">{this.generateKeys()}</div>
        <div className="hidden lg:flex flex-row">{this.generateKeys()}</div>
      </div>
    );
  }
}

export default Keys;
