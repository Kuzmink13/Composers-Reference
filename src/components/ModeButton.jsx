import React, { Component } from 'react';

class ModeButton extends Component {
  render() {
    const isSelected = this.props.tonalityIndex === this.props.tonalitySelector;
    return (
      <div
        onClick={() =>
          this.props.handleSelectorChange(this.props.tonalityIndex)
        }
        className={`p-3 mx-0 sm:mx-6 lg:mx-12 font-semibold tracking-wider ${
          isSelected ? 'border-t border-gray-900' : 'text-gray-500'
        }`}
      >
        {this.props.name}-NOTE
        <span
          className={`text-white text-xs ml-3 py-1 px-2 align-text-middle rounded-full shadow-md ${
            isSelected ? 'bg-gray-700' : 'bg-gray-400'
          }`}
        >
          {this.props.size}
        </span>
      </div>
    );
  }
}

export default ModeButton;
