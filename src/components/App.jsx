import React, { Component } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoteSelected: Array(12).fill(false),
      hasEnoughNotes: false,
      root: undefined,
      filteredLists: Array(3).fill([]),
    };
    this.updateFilteredLists = this.updateFilteredLists.bind(this);
    this.updateHasEnoughNotes = this.updateHasEnoughNotes.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRootKeyPress = this.handleRootKeyPress.bind(this);
  }

  updateFilteredLists() {
    const filterByQuan = (modes, noteQuan) =>
      modes.filter((mode) => mode.getNoteQuantity() === noteQuan);

    this.setState((state) => ({
      filteredLists: (() => {
        const modes = Music.generateAllModes(
          Music.buildScaleArray(state.isNoteSelected),
          state.root
        );
        return Utilities.supportedScaleLengths.map((quan) =>
          filterByQuan(modes, quan)
        );
      })(),
    }));
  }

  updateHasEnoughNotes() {
    this.setState((state) => ({
      hasEnoughNotes:
        state.isNoteSelected.reduce((acc, el) => acc + Number(el), 0) > 1,
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
    this.updateFilteredLists();
    this.updateHasEnoughNotes();
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
    this.updateFilteredLists();
    this.updateHasEnoughNotes();
  }

  render() {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <Navbar />

        <div className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
          <Keys
            isNoteSelected={this.state.isNoteSelected}
            root={this.state.root}
            handleKeyPress={this.handleKeyPress}
            handleRootKeyPress={this.handleRootKeyPress}
          />
          <ModeController
            hasEnoughNotes={this.state.hasEnoughNotes}
            filteredLists={this.state.filteredLists}
          />
        </div>
      </div>
    );
  }
}

export default App;
