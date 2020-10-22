import React, { Component } from 'react';

class ModeButton extends Component {
  state = {};
  render() {
    return (
      <div className="flex-1 py-3">
        {this.props.name} NOTE
        <span className="text-white text-xs bg-gray-700 mx-3 py-1 px-2 align-text-middle rounded-full shadow-md">
          {this.props.size}
        </span>
      </div>
    );
  }
}

export default ModeButton;
