import React, { Component } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteNamesOn: false,
      keysPressed: Array(12).fill(false),
      root: undefined,
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRootPress = this.handleRootPress.bind(this);
  }

  handlePress(noteIndex) {
    this.setState((state) => ({
      keysPressed: state.keysPressed.map((el, i) =>
        i === noteIndex ? !el : el
      ),
      root: noteIndex === state.root ? undefined : state.root,
    }));
  }

  handleRootPress(noteIndex) {
    this.setState((state) => ({
      keysPressed: state.keysPressed.map((el, i) =>
        i === noteIndex ? (i === state.root ? false : true) : el
      ),
      root: noteIndex === state.root ? undefined : noteIndex,
    }));
  }

  render() {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />

        <div className="h-full w-full mx-auto lg:max-w-screen-lg">
          <Keys
            noteNamesOn={this.state.noteNamesOn}
            keysPressed={this.state.keysPressed}
            root={this.state.root}
            handlePress={this.handlePress}
            handleRootPress={this.handleRootPress}
          />
          <ButtonPanel />
          <ModePanel />
        </div>
      </div>
    );
  }
}

export default App;
