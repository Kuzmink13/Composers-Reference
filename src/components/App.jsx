import React, { Fragment, useEffect, useState } from 'react';

import Navbar from './Navbar';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ModeController from './ModeController';

import Music from '../Music';
import Scales from '../Scales';
import Keyboard from '../Keyboard';
import Utilities from '../Utilities';

const { supportedScaleLengths } = Scales;
const { notesInOctave, tonalities, supportedClefs } = Utilities;

function App() {
  // NOTE/ROOT SELECTION
  const isNoteSelectedDefault = () => Array(notesInOctave).fill(false);
  const rootDefault = undefined;
  const [isNoteSelected, setIsNoteSelected] = useState(isNoteSelectedDefault());
  const [root, setRoot] = useState(rootDefault);

  function handleKeyPress(event, pressedNote) {
    const isKeyGettingPressed = (i) => i === pressedNote;
    const isRootPress = event.shiftKey;
    const isPressedNoteCurrentRoot = pressedNote === root;
    const newNoteSelection = isRootPress ? true : !isNoteSelected[pressedNote];

    setIsNoteSelected(
      isNoteSelected.map((noteSelection, i) =>
        isKeyGettingPressed(i) ? newNoteSelection : noteSelection
      )
    );
    setRoot(
      isPressedNoteCurrentRoot ? rootDefault : isRootPress ? pressedNote : root
    );
  }

  function handleKeyBoardPress(event) {
    if (!isModeCardShown) {
      const pressedNote = Keyboard.getNote(event.code);
      pressedNote !== undefined && handleKeyPress(event, pressedNote);
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyBoardPress);
    return () => {
      document.removeEventListener('keypress', handleKeyBoardPress);
    };
  });

  // CLEAR NOTE/ROOT SELECTION
  function clearAll() {
    setIsNoteSelected(isNoteSelectedDefault());
    setRoot(rootDefault);
  }

  function handleDelete(event) {
    if (Keyboard.isDelete(event.key)) {
      closeCard();
      clearAll();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleDelete);
    return () => {
      document.removeEventListener('keydown', handleDelete);
    };
  });

  // MODE CARD CONTROLLER
  const isModeCardShownDefault = false;
  const modePropsDefault = undefined;
  const [isModeCardShown, setIsModeCardShown] = useState(
    isModeCardShownDefault
  );
  const [modeProps, setModeProps] = useState(modePropsDefault);

  function getCard(modeProps) {
    setIsModeCardShown(true);
    setModeProps(modeProps);
  }

  function closeCard() {
    setIsModeCardShown(isModeCardShownDefault);
    setModeProps(modePropsDefault);
  }

  function handleEscape(event) {
    Keyboard.isEscape(event.key) && closeCard();
  }

  function preventScroll(event) {
    isModeCardShown && Keyboard.isSpace(event.key) && event.preventDefault();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', preventScroll);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', preventScroll);
    };
  });

  // NOTE NAME VISIBILITY TOGGLE
  const noteNameVisibilityDefault = false;
  const [areNoteNamesVisible, setareNoteNamesVisible] = useState(
    noteNameVisibilityDefault
  );

  function handleNoteNamesVisible() {
    setareNoteNamesVisible(!areNoteNamesVisible);
  }

  function revertNoteNamesVisible() {
    setareNoteNamesVisible(noteNameVisibilityDefault);
  }

  // FILTER RESULTS BY NOTE SELECTION TOGGLE
  const isFilteredBySelectionDefault = false;
  const [isFilteredBySelection, setIsFilteredBySelection] = useState(
    isFilteredBySelectionDefault
  );

  function handleIsFilteredBySelection() {
    setIsFilteredBySelection(!isFilteredBySelection);
  }

  function revertIsFilteredBySelection() {
    setIsFilteredBySelection(isFilteredBySelectionDefault);
  }

  // CLEF SELECTION CONTROL
  const clefDefault = supportedClefs[0];
  const [clef, setClef] = useState(clefDefault);

  function handleClefChange(newClef) {
    setClef(newClef);
  }

  function revertClef() {
    setClef(clefDefault);
  }

  // SELECTED TONALITIES CONTROL
  const selectedTonalitiesDefault = () => Array.from(tonalities, () => true);
  const [selectedTonalities, setSelectedTonalities] = useState(
    selectedTonalitiesDefault()
  );

  function handleSelectedTonalityChange(tonalityIndex) {
    const isUpdating = (i) => tonalityIndex === i;

    setSelectedTonalities(
      selectedTonalities.map((el, i) => (isUpdating(i) ? !el : el))
    );
  }

  function revertSelectedTonalities() {
    const hasSelectionChanged = () =>
      !selectedTonalitiesDefault().reduce(
        (acc, el, i) => acc && el === selectedTonalities[i],
        true
      );

    hasSelectionChanged() && setSelectedTonalities(selectedTonalitiesDefault());
  }

  // REVERT TO DEFAULT SETTINGS
  function handleRevertSettings() {
    revertNoteNamesVisible();
    revertIsFilteredBySelection();
    revertClef();
    revertSelectedTonalities();
  }

  // SCREEN SIZE CONTROL
  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    switch (true) {
      case window.innerWidth < 640:
        return 1;
      case window.innerWidth < 1024:
        return 2;
      default:
        return 3;
    }
  }

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // FILTERED LIST GENERATION
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );

  useEffect(() => {
    setFilteredLists(
      Music.getFilterdLists(
        isNoteSelected,
        root,
        selectedTonalities,
        isFilteredBySelection
      )
    );
  }, [isNoteSelected, root, selectedTonalities, isFilteredBySelection]);

  // RENDER
  return (
    <Fragment>
      <Navbar
        areNoteNamesVisible={areNoteNamesVisible}
        isFilteredBySelection={isFilteredBySelection}
        selectedTonalities={selectedTonalities}
        clef={clef}
        clearAll={clearAll}
        handleNoteNamesVisible={handleNoteNamesVisible}
        handleIsFilteredBySelection={handleIsFilteredBySelection}
        handleSelectedTonalityChange={handleSelectedTonalityChange}
        handleClefChange={handleClefChange}
        handleRevertSettings={handleRevertSettings}
      />

      {isModeCardShown && (
        <div
          className="fixed h-full w-full inset-0 z-30 flex bg-gray-400 bg-opacity-25"
          onClick={closeCard}
        >
          <ModeCard {...modeProps} />
        </div>
      )}

      <main className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys
          isNoteSelected={isNoteSelected}
          root={root}
          areNoteNamesVisible={areNoteNamesVisible}
          screenSize={screenSize}
          handleKeyPress={handleKeyPress}
        />
        <ModeController
          filteredLists={filteredLists}
          clef={clef}
          getCard={getCard}
        />
      </main>
    </Fragment>
  );
}

export default App;
