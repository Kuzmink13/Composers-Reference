import React, { Component } from 'react';

class ButtonPanel extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-row py-2 px-6 font-semibold tracking-wider text-center">
        <div className="flex-1">WHOLE TONE</div>
        <div className="flex-1">MAJOR</div>
        <div className="flex-1">MINOR</div>
        <div className="flex-1">DIMINISHED</div>
      </div>
    );
  }
}

export default ButtonPanel;
