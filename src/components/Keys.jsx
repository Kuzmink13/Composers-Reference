import React, { Component, Fragment } from 'react';
import Utilities from '../Utilities';

class Keys extends Component {
  constructor(props) {
    super(props);
    Utilities.noteNames.forEach((el) => {
      this.state.keys[el] = {};
      this.state.keys[el]['pressed'] = false;
      this.state.keys[el]['root'] = false;
      this.state.keys[el]['color'] = el.length === 1 ? 'white' : 'black';
    });
  }
  state = {
    keys: {},
  };
  render() {
    const whiteKey = (
      <div className="h-64 w-10 bg-white border border-gray-400 rounded-md hover:bg-orange-100"></div>
    );
    const blackKey = (
      <div className="h-40 w-6 -mx-3 z-10 bg-gray-800 border border-gray-900 rounded-md hover:bg-orange-900"></div>
    );
    const sequence = Object.entries(this.state.keys).map(([key, value]) =>
      value.color === 'white' ? whiteKey : blackKey
    );
    return (
      <div className="p-8 flex flex-row justify-center h-auto border-b border-gray-400">
        <div className="flex flex-row">{sequence}</div>
        <div className="hidden sm:flex flex-row">{sequence}</div>
        <div className="hidden lg:flex flex-row">{sequence}</div>
      </div>
    );
  }
}

export default Keys;
