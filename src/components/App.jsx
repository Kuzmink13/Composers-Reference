import React, { Component } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';

const { supportedScaleLengths } = Utilities;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNoteSelected: Array(12).fill(false),
      root: undefined,
      filteredLists: Array(3).fill([]),
    };
    this.updateFilteredLists = this.updateFilteredLists.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleRootKeyPress = this.handleRootKeyPress.bind(this);
  }

  updateFilteredLists() {
    this.setState((state) => {
      const filterByQuantity = (modes, noteQuantity) =>
        modes.filter((mode) => mode.getNoteQuantity() === noteQuantity);
      const modes = Music.generateAllModes(
        Music.buildScaleArray(state.isNoteSelected),
        state.root
      );

      return {
        filteredLists: supportedScaleLengths.map((quantity) =>
          filterByQuantity(modes, quantity)
        ),
      };
    });
  }

  static keyPressUtilities(state, pressedNote) {
    return {
      isKeyGettingPressed: (i) => i === pressedNote,
      isKeyCurrentRoot: (i) => i === state.root,
      isPressedNoteCurrentRoot: pressedNote === state.root,
    };
  }

  handleKeyPress(pressedNote) {
    this.setState((state) => {
      const {
        isKeyGettingPressed,
        isPressedNoteCurrentRoot,
      } = App.keyPressUtilities(state, pressedNote);

      return {
        isNoteSelected: state.isNoteSelected.map((key, i) =>
          isKeyGettingPressed(i) ? !key : key
        ),
        root: isPressedNoteCurrentRoot ? undefined : state.root,
      };
    });
    this.updateFilteredLists();
  }

  handleRootKeyPress(pressedNote) {
    this.setState((state) => {
      const {
        isKeyGettingPressed,
        isKeyCurrentRoot,
        isPressedNoteCurrentRoot,
      } = App.keyPressUtilities(state, pressedNote);

      return {
        isNoteSelected: state.isNoteSelected.map((key, i) =>
          isKeyGettingPressed(i) ? (isKeyCurrentRoot(i) ? false : true) : key
        ),
        root: isPressedNoteCurrentRoot ? undefined : pressedNote,
      };
    });
    this.updateFilteredLists();
  }

  render() {
    const appCode = `${this.state.isNoteSelected
      .map((el) => Number(el))
      .join('')}//${this.state.root}`;

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
            filteredLists={this.state.filteredLists}
            appCode={appCode}
          />
        </div>
      </div>
    );
  }
}

export default App;
