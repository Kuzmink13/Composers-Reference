import React, { Component } from 'react';
import Staff from './Staff';

class ModeBlock extends Component {
  render() {
    return (
      <div className=" h-32 m-2 p-2 bg-white border border-gray-400 rounded-lg text-center text-gray-800">
        {this.props.modeName}
        <Staff
          modeName={this.props.modeName}
          vexScale={this.props.vexScale}
          vf={this.props.vf}
        />
      </div>
    );
  }
}

export default ModeBlock;
