import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';

const {
  notesInOctave,
  supportedScaleLengths,
  tonalities,
  supportedClefs,
} = Utilities;

function App() {
  // NOTE/ROOT SELECTION
  const [isNoteSelected, setIsNoteSelected] = useState(
    Array(notesInOctave).fill(false)
  );
  const [root, setRoot] = useState(undefined);

  function handleKeyPress(pressedNote, isRootPress) {
    const isKeyGettingPressed = (i) => i === pressedNote;
    const isPressedNoteCurrentRoot = pressedNote === root;
    const newNote = isRootPress ? true : !isNoteSelected[pressedNote];

    setIsNoteSelected(
      isNoteSelected.map((key, i) => (isKeyGettingPressed(i) ? newNote : key))
    );
    setRoot(
      isPressedNoteCurrentRoot ? undefined : isRootPress ? pressedNote : root
    );
  }

  // CLEAR NOTE/ROOT SELECTION
  function clearAll() {
    setIsNoteSelected(Array(notesInOctave).fill(false));
    setRoot(undefined);
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
  const [areNoteNamesVisible, setareNoteNamesVisible] = useState(false);

  function handleNoteNamesVisible() {
    setareNoteNamesVisible(!areNoteNamesVisible);
  }

  // FILTER RESULTS BY NOTE SELECTION TOGGLE
  const [isFilteredBySelection, setIsFilteredBySelection] = useState(false);

  function handleIsFilteredBySelection() {
    setIsFilteredBySelection(!isFilteredBySelection);
  }

  // CLEF SELECTION CONTROL
  const [clef, setClef] = useState(supportedClefs[0]);

  function handleClefChange(newClef) {
    setClef(newClef);
  }

  // SELECTED TONALITIES CONTROL
  const [selectedTonalities, setSelectedTonalities] = useState(
    Array.from(tonalities, () => true)
  );

  function handleSelectedTonalityChange(tonalityIndex) {
    const isUpdating = (i) => tonalityIndex === i;

    setSelectedTonalities(
      selectedTonalities.map((el, i) => (isUpdating(i) ? !el : el))
    );
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
