import React, { Component } from 'react';

class Key extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: props.note,
      noteNamesOn: props.noteNamesOn,
      isWhite: props.note.length === 1,
      pressed: false,
      root: false,
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRootPress = this.handleRootPress.bind(this);
  }

  getElement() {
    return this.state.isWhite
      ? this.getKeyStateWhite()
      : this.getKeyStateBlack();
  }

  getKeyStateWhite() {
    const base = 'h-64 w-10 border rounded-md shadow-md flex justify-center';
    const text = 'self-end p-2 font-semibold text-lg';
    switch (true) {
      case this.state.root:
        return (
          <div
            className={`${base} bg-blue-400 border-blue-500 hover:bg-blue-300 hover:border-blue-400`}
          >
            <span className={`${text} text-blue-900`}>
              {this.state.noteNamesOn && this.state.note}
            </span>
          </div>
        );

      case this.state.pressed:
        return (
          <div
            className={`${base} bg-orange-400 border-orange-500 hover:bg-orange-300 hover:border-orange-400`}
          >
            <span className={`${text} text-orange-900`}>
              {this.state.noteNamesOn && this.state.note}
            </span>
          </div>
        );

      default:
        return (
          <div
            className={`${base} bg-white border-gray-400 hover:bg-purple-200 hover:border-purple-300`}
          >
            <span className={`${text} text-gray-800`}>
              {this.state.noteNamesOn && this.state.note}
            </span>
          </div>
        );
    }
  }

  getKeyStateBlack() {
    const base = 'h-40 w-6 -mx-3 border rounded-md shadow-md';
    switch (true) {
      case this.state.root:
        return (
          <div
            className={`${base} bg-blue-800 border-blue-900 hover:bg-blue-700 hover:border-gray-800`}
          ></div>
        );

      case this.state.pressed:
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

  handlePress() {
    this.setState((state) => ({
      pressed: !state.pressed,
      root: false,
    }));
  }

  handleRootPress() {
    this.setState((state) => ({
      pressed: !state.pressed || !state.root,
      root: !state.pressed || !state.root,
    }));
  }

  render() {
    return (
      <div
        onClick={this.handlePress}
        onDoubleClick={this.handleRootPress}
        className={this.state.isWhite ? 'z-0' : 'z-10'}
      >
        {this.getElement()}
      </div>
    );
  }
}

export default Key;
