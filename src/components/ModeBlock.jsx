import React, { Component } from 'react';
import Staff from './Staff';

class ModeBlock extends Component {
  render() {
    return (
      <div className=" h-32 m-2 p-2 bg-white border border-gray-400 rounded-lg text-center text-gray-800">
        {this.props.modeName}
        <Staff
          pitchCenter={this.props.pitchCenter}
          absolutePitches={this.props.absolutePitches}
          modeCode={this.props.modeCode}
          modeName={this.props.modeName}
        />
      </div>
    );
  }
}

export default ModeBlock;
