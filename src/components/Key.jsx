import React, { Component } from 'react';

class Key extends Component {
  getKeyElementWhite() {
    const base =
      'h-64 w-10 border rounded-md shadow-md flex justify-center items-end';
    const text = 'p-2 font-semibold text-lg';
    const isRoot = this.props.noteValue === this.props.root;

    switch (true) {
      case isRoot:
        return (
          <div
            className={`${base} bg-blue-400 border-blue-500 hover:bg-blue-300 hover:border-blue-400`}
          >
            <span className={`${text} text-blue-900`}>
              {this.props.areNoteNamesShownOnKeys && this.props.noteName}
            </span>
          </div>
        );

      case this.props.isNoteSelected:
        return (
          <div
            className={`${base} bg-orange-400 border-orange-500 hover:bg-orange-300 hover:border-orange-400`}
          >
            <span className={`${text} text-orange-900`}>
              {this.props.areNoteNamesShownOnKeys && this.props.noteName}
            </span>
          </div>
        );

      default:
        return (
          <div
            className={`${base} bg-white border-gray-400 hover:bg-purple-100 hover:border-purple-200`}
          >
            <span className={`${text} text-gray-800`}>
              {this.props.areNoteNamesShownOnKeys && this.props.noteName}
            </span>
          </div>
        );
    }
  }

  getKeyElementBlack() {
    const base = 'h-40 w-6 -mx-3 border rounded-md shadow-md';
    const isRoot = this.props.noteValue === this.props.root;

    switch (true) {
      case isRoot:
        return (
          <div
            className={`${base} bg-blue-800 border-blue-900 hover:bg-blue-700 hover:border-gray-800`}
          ></div>
        );

      case this.props.isNoteSelected:
        return (
          <div
            className={`${base} bg-orange-800 border-orange-900 hover:bg-orange-700 hover:border-orange-800`}
          ></div>
        );

      default:
        return (
          <div
            className={`${base} bg-gray-800 border-gray-900 hover:bg-purple-900 hover:border-gray-900`}
          ></div>
        );
    }
  }

  render() {
    const isWhite = this.props.noteName.length === 1;

    return (
      <div
        onClick={() => this.props.handleKeyPress(this.props.noteValue)}
        onDoubleClick={() =>
          this.props.handleRootKeyPress(this.props.noteValue)
        }
        className={isWhite ? 'z-0' : 'z-10'}
      >
        {isWhite ? this.getKeyElementWhite() : this.getKeyElementBlack()}
      </div>
    );
  }
}

export default Key;
