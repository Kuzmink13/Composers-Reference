import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';
import Scales from '../Scales';

const { notesInOctave, tonalities, supportedClefs, keyMap } = Utilities;
const { supportedScaleLengths } = Scales;

function App() {
  // NOTE/ROOT SELECTION
  const isNoteSelectedDefault = () => Array(notesInOctave).fill(false);
  const rootDefault = undefined;
  const [isNoteSelected, setIsNoteSelected] = useState(isNoteSelectedDefault());
  const [root, setRoot] = useState(rootDefault);

  function handleKeyPress(pressedNote, isRootPress) {
    const isKeyGettingPressed = (i) => i === pressedNote;
    const isPressedNoteCurrentRoot = pressedNote === root;
    const newNote = isRootPress ? true : !isNoteSelected[pressedNote];

    setIsNoteSelected(
      isNoteSelected.map((key, i) => (isKeyGettingPressed(i) ? newNote : key))
    );
    setRoot(
      isPressedNoteCurrentRoot ? rootDefault : isRootPress ? pressedNote : root
    );
  }

  function handleKeyBoardPress(event) {
    const pressedNote = keyMap[event.key.toLowerCase()];
    const isRootPress = event.shiftKey;
    pressedNote !== undefined && handleKeyPress(pressedNote, isRootPress);
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
    (event.key === 'Del' || event.key === 'Delete') && clearAll();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleDelete);
    return () => {
      document.removeEventListener('keydown', handleDelete);
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
    setSelectedTonalities(selectedTonalitiesDefault());
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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

      <div className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys
          isNoteSelected={isNoteSelected}
          root={root}
          areNoteNamesVisible={areNoteNamesVisible}
          screenSize={screenSize}
          handleKeyPress={handleKeyPress}
        />
        <ModeController filteredLists={filteredLists} clef={clef} />
      </div>
    </div>
  );
}

export default App;
