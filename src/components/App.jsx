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
      tonalitySelector: 1,
      isWide: window.innerWidth >= 1024,
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleRootPress = this.handleRootPress.bind(this);
    this.handleResize = this.handleResize.bind(this);
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

  handleResize() {
    this.setState({
      isWide: window.innerWidth >= 1024,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />

        <div className="h-full w-full flex flex-col mx-auto lg:max-w-screen-lg">
          <Keys
            noteNamesOn={this.state.noteNamesOn}
            keysPressed={this.state.keysPressed}
            root={this.state.root}
            handlePress={this.handlePress}
            handleRootPress={this.handleRootPress}
          />
          <ButtonPanel />
          <ModePanel
            keysPressed={this.state.keysPressed}
            root={this.state.root}
            tonalitySelector={this.state.tonalitySelector}
            isWide={this.state.isWide}
          />
        </div>
      </div>
    );
  }
}

export default App;
