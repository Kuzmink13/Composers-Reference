import React, { Component } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

class Keys extends Component {
  generateKeys() {
    return Utilities.noteNamesSharp.map((noteName, i) => (
      <Key
        key={i}
        noteName={noteName}
        noteValue={i}
        areNoteNamesShownOnKeys={this.props.areNoteNamesShownOnKeys}
        root={this.props.root}
        isNoteSelected={this.props.isNoteSelected[i]}
        handleKeyPress={this.props.handleKeyPress}
        handleRootKeyPress={this.props.handleRootKeyPress}
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
