import React, { Component } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

const { notesInOctave, octaveMod } = Utilities;

class Keys extends Component {
  generateKeys() {
    return Array.from(Array(notesInOctave), (el, i) => (
      <Key key={i} value={octaveMod(i)} {...this.props} />
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
