import React, { Component } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areNoteNamesShownOnKeys: false,
      isNoteSelected: Array(12).fill(false),
      root: undefined,
      selectedScaleList: 1,
      isWide: window.innerWidth >= 1024,
      modeList: [],
    };
    this.updateModeList = this.updateModeList.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRootKeyPress = this.handleRootKeyPress.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  updateModeList() {
    this.setState((state) => ({
      modeList: Music.generateAllModes(
        Music.buildScaleArray(state.isNoteSelected),
        state.root
      ),
    }));
  }

  handleKeyPress(pressedNote) {
    this.setState((state) => ({
      isNoteSelected: state.isNoteSelected.map((key, i) => {
        const isKeyGettingPressed = i === pressedNote;
        return isKeyGettingPressed ? !key : key;
      }),
      root: (() => {
        const isPressedNoteCurrentRoot = pressedNote === state.root;
        return isPressedNoteCurrentRoot ? undefined : state.root;
      })(),
    }));
    this.updateModeList();
  }

  handleRootKeyPress(pressedNote) {
    this.setState((state) => ({
      isNoteSelected: state.isNoteSelected.map((key, i) => {
        const isKeyGettingPressed = i === pressedNote;
        const isKeyCurrentRoot = i === state.root;
        return isKeyGettingPressed ? (isKeyCurrentRoot ? false : true) : key;
      }),
      root: (() => {
        const isPressedNoteCurrentRoot = pressedNote === state.root;
        return isPressedNoteCurrentRoot ? undefined : pressedNote;
      })(),
    }));
    this.updateModeList();
  }

  handleSelectorChange(scaleList) {
    this.setState({
      selectedScaleList: scaleList,
    });
  }

  render() {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />

        <div className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
          <Keys
            areNoteNamesShownOnKeys={this.state.areNoteNamesShownOnKeys}
            isNoteSelected={this.state.isNoteSelected}
            root={this.state.root}
            handleKeyPress={this.handleKeyPress}
            handleRootKeyPress={this.handleRootKeyPress}
          />
          <ModeController
            modeList={this.state.modeList}
            selectedScaleList={this.state.selectedScaleList}
            handleSelectorChange={this.handleSelectorChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
