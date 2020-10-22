import React, { Component } from 'react';

class ModeButton extends Component {
  state = {};
  render() {
    return (
      <div
        onClick={() =>
          this.props.handleSelectorChange(this.props.tonalityIndex)
        }
        className={
          this.props.tonalityIndex === this.props.tonalitySelector
            ? 'flex-1 py-3 border-t border-gray-900'
            : 'flex-1 py-3'
        }
      >
        {this.props.name} NOTE
        <span className="text-white text-xs bg-gray-700 mx-3 py-1 px-2 align-text-middle rounded-full shadow-md">
          {this.props.size}
        </span>
      </div>
    );
  }
}

export default ModeButton;
