import React, { Component } from 'react';
import Utilities from '../Utilities';

class ModeBlock extends Component {
  render() {
    return (
      <div className=" h-32 w-64 my-2 mx-6 p-2 bg-white border border-gray-400 rounded-lg text-center">
        {`${Utilities.noteNames[this.props.note]} ${
          Utilities.modeNames[this.props.code]
        }`}
      </div>
    );
  }
}

export default ModeBlock;
