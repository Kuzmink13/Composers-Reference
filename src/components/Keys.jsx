import React, { Component } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

class Keys extends Component {
  state = {
    noteNamesOn: false,
  };
  render() {
    let sequence = Utilities.noteNames.map((el) => (
      <Key noteNamesOn={this.state.noteNamesOn} note={el} />
    ));
    return (
      <div className="p-8 flex flex-row justify-center h-auto border-b border-gray-400">
        <div className="flex flex-row">
          <div className="flex flex-row">{sequence}</div>
          <div className="hidden sm:flex flex-row">{sequence}</div>
          <div className="hidden lg:flex flex-row">{sequence}</div>
        </div>
      </div>
    );
  }
}

export default Keys;
