import React, { Component } from 'react';

class ButtonPanel extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-row py-2 px-6 font-semibold tracking-wider text-center">
        <div className="flex-1">SIX NOTE</div>
        <div className="flex-1">SEVEN NOTE</div>
        <div className="flex-1">EIGHT NOTE</div>
      </div>
    );
  }
}

export default ButtonPanel;
