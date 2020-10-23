import React, { Component } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteNamesOn: false,
      keysPressed: Array(12).fill(false),
      root: undefined,
      tonalitySelector: 1,
      isWide: window.innerWidth >= 1024,
      modeList: [],
    };
    this.updateModeList = this.updateModeList.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleRootPress = this.handleRootPress.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  updateModeList() {
    this.setState((state) => ({
      modeList: Music.generateAllModes(
        Music.buildScale(state.keysPressed),
        state.root
      ),
    }));
  }

  handlePress(noteIndex) {
    this.setState((state) => ({
      keysPressed: state.keysPressed.map((el, i) =>
        i === noteIndex ? !el : el
      ),
      root: noteIndex === state.root ? undefined : state.root,
    }));
    this.updateModeList();
  }

  handleRootPress(noteIndex) {
    this.setState((state) => ({
      keysPressed: state.keysPressed.map((el, i) =>
        i === noteIndex ? (i === state.root ? false : true) : el
      ),
      root: noteIndex === state.root ? undefined : noteIndex,
    }));
    this.updateModeList();
  }

  handleSelectorChange(tonalityIndex) {
    this.setState({
      tonalitySelector: tonalityIndex,
    });
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

        <div className="h-full flex flex-col mx-auto lg:max-w-screen-lg">
          <Keys
            noteNamesOn={this.state.noteNamesOn}
            keysPressed={this.state.keysPressed}
            root={this.state.root}
            handlePress={this.handlePress}
            handleRootPress={this.handleRootPress}
          />
          <ModeController
            modeList={this.state.modeList}
            tonalitySelector={this.state.tonalitySelector}
            isWide={this.state.isWide}
            handleSelectorChange={this.handleSelectorChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
