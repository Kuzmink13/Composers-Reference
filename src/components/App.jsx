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
  const [isNoteSelected, setIsNoteSelected] = useState(
    Array(notesInOctave).fill(false)
  );
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );
  const [selectedTonalities, setSelectedTonalities] = useState(
    Array.from(tonalities, () => true)
  );
  const [areNoteNamesVisible, setareNoteNamesVisible] = useState(false);
  const [isFilteredBySelection, setIsFilteredBySelection] = useState(false);
  const [clef, setClef] = useState(supportedClefs[0]);
  const [root, setRoot] = useState(undefined);
  const [screenSize, setScreenSize] = useState(getScreenSize());

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

  function clearAll() {
    setIsNoteSelected(Array(notesInOctave).fill(false));
    setRoot(undefined);
  }

  function handleDelete(event) {
    (event.key === 'Del' || event.key === 'Delete') && clearAll();
  }

  function handleNoteNamesVisible() {
    setareNoteNamesVisible(!areNoteNamesVisible);
  }

  function handleIsFilteredBySelection() {
    setIsFilteredBySelection(!isFilteredBySelection);
  }

  function handleClefChange(newClef) {
    setClef(newClef);
  }

  function handleSelectedTonalityChange(tonalityIndex) {
    const isUpdating = (i) => tonalityIndex === i;

    setSelectedTonalities(
      selectedTonalities.map((el, i) => (isUpdating(i) ? !el : el))
    );
  }

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

  useEffect(() => {
    document.addEventListener('keydown', handleDelete);
    return () => {
      document.removeEventListener('keydown', handleDelete);
    };
  });

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
