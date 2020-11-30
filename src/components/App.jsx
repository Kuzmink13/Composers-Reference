import React, { Fragment, useEffect, useState } from 'react';

import Navbar from './Navbar';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ModeController from './ModeController';

import Music from '../Music';
import Scales from '../Scales';
import Keyboard from '../Keyboard';
import AppStorage from '../AppStorage';
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
    if (!isModeCardShown && !event.repeat) {
      const pressedNote = Keyboard.getNote(event.code);
      pressedNote !== undefined && handleKeyPress(event, pressedNote);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyBoardPress);
    return () => {
      document.removeEventListener('keydown', handleKeyBoardPress);
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

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  // KEYBOARD OVERLAY TOGGLE
  const isOverlayActiveDefault = false;
  const [isOverlayActive, setIsOverlayActive] = useState(
    AppStorage.getBoolean('overlay') || isOverlayActiveDefault
  );

  function handleOverlayToggle() {
    setIsOverlayActive(!isOverlayActive);
    AppStorage.setBoolean('overlay', !isOverlayActive);
  }

  function revertOverlayToggle() {
    setIsOverlayActive(isOverlayActiveDefault);
    AppStorage.removeItem('overlay');
  }

  // NOTE NAME VISIBILITY TOGGLE
  const noteNameVisibilityDefault = false;
  const [areNoteNamesVisible, setAreNoteNamesVisible] = useState(
    AppStorage.getBoolean('noteNames') || noteNameVisibilityDefault
  );

  function handleNoteNamesVisible() {
    setAreNoteNamesVisible(!areNoteNamesVisible);
    AppStorage.setBoolean('noteNames', !areNoteNamesVisible);
  }

  function revertNoteNamesVisible() {
    setAreNoteNamesVisible(noteNameVisibilityDefault);
    AppStorage.removeItem('noteNames');
  }

  // FILTER RESULTS BY NOTE SELECTION TOGGLE
  const isFilteredBySelectionDefault = false;
  const [isFilteredBySelection, setIsFilteredBySelection] = useState(
    AppStorage.getBoolean('selectionFilter') || isFilteredBySelectionDefault
  );

  function handleIsFilteredBySelection() {
    setIsFilteredBySelection(!isFilteredBySelection);
    AppStorage.setBoolean('selectionFilter', !isFilteredBySelection);
  }

  function revertIsFilteredBySelection() {
    setIsFilteredBySelection(isFilteredBySelectionDefault);
    AppStorage.removeItem('selectionFilter');
  }

  // CLEF SELECTION CONTROL
  const clefDefault = supportedClefs[0];
  const [clef, setClef] = useState(AppStorage.getItem('clef') || clefDefault);

  function handleClefChange(newClef) {
    setClef(newClef);
    AppStorage.setItem('clef', newClef);
  }

  function revertClef() {
    setClef(clefDefault);
    AppStorage.removeItem('clef');
  }

  // SELECTED TONALITIES CONTROL
  const selectedTonalitiesDefault = () => Array.from(tonalities, () => true);
  const [selectedTonalities, setSelectedTonalities] = useState(
    AppStorage.getBooleanArray('tonalities') || selectedTonalitiesDefault()
  );

  function handleSelectedTonalityChange(tonalityIndex) {
    const isUpdating = (i) => tonalityIndex === i;
    const newSelectedTonalities = selectedTonalities.map((el, i) =>
      isUpdating(i) ? !el : el
    );

    setSelectedTonalities(newSelectedTonalities);
    AppStorage.setBooleanArray('tonalities', newSelectedTonalities);
  }

  function revertSelectedTonalities() {
    const hasSelectionChanged = () =>
      !selectedTonalitiesDefault().reduce(
        (acc, el, i) => acc && el === selectedTonalities[i],
        true
      );

    if (hasSelectionChanged()) {
      setSelectedTonalities(selectedTonalitiesDefault());
      AppStorage.removeItem('tonalities');
    }
  }

  // REVERT TO DEFAULT SETTINGS
  function handleRevertSettings(event) {
    event.preventDefault();
    revertOverlayToggle();
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

  // MODE-CARD ANIMATION
  useEffect(() => {
    if (isModeCardShown) {
      const container = document.getElementById('grayed-out-background');

      container.classList.remove('bg-opacity-0');
      container.classList.add('bg-opacity-25');
    }
  });

  // RENDER
  return (
    <Fragment>
      <Navbar
        isOverlayActive={isOverlayActive}
        areNoteNamesVisible={areNoteNamesVisible}
        isFilteredBySelection={isFilteredBySelection}
        selectedTonalities={selectedTonalities}
        isModeCardShown={isModeCardShown}
        clef={clef}
        clearAll={clearAll}
        handleOverlayToggle={handleOverlayToggle}
        handleNoteNamesVisible={handleNoteNamesVisible}
        handleIsFilteredBySelection={handleIsFilteredBySelection}
        handleSelectedTonalityChange={handleSelectedTonalityChange}
        handleClefChange={handleClefChange}
        handleRevertSettings={handleRevertSettings}
      />

      {isModeCardShown && (
        <div
          id="grayed-out-background"
          className="fixed h-full w-full inset-0 z-30 flex bg-gray-400 bg-opacity-0 transition delay-25 duration-50"
          onClick={closeCard}
        >
          <ModeCard {...modeProps} closeCard={closeCard} />
        </div>
      )}

      <main className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys
          isNoteSelected={isNoteSelected}
          root={root}
          isOverlayActive={isOverlayActive}
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
