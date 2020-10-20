import React, { Component } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

class Keys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteNamesOn: false,
      pressedArray: Array(12).fill(false),
      root: undefined,
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress(index) {
    this.setState((state) => ({
      pressedArray: state.pressedArray.map((el, i) => (i === index ? !el : el)),
    }));
  }

  // handleRootPress() {
  //   this.setState((state) => ({
  //     pressed: !state.pressed || !state.root,
  //     root: !state.pressed || !state.root,
  //   }));
  // }

  render() {
    let sequence = Utilities.noteNames.map((el, i) => (
      <Key
        key={i}
        noteNamesOn={this.state.noteNamesOn}
        noteName={el}
        index={i}
        root={this.state.root}
        pressed={this.state.pressedArray[i]}
        handlePress={this.handlePress}
      />
    ));
    return (
      <div className="p-8 flex flex-row justify-center h-auto border-b border-gray-400">
        <div className="flex flex-row">
          <div className="flex flex-row">{sequence}</div>
          <div className="hidden sm:flex flex-row">{sequence}</div>
          <div className="hidden lg:flex flex-row">{sequence}</div>
        </div>
      </div>
    );
  }
}

export default Keys;
