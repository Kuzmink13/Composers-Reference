import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';

const { notesInOctave, supportedScaleLengths } = Utilities;

function App() {
  const [isNoteSelected, setIsNoteSelected] = useState(
    Array(notesInOctave).fill(false)
  );
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );
  const [areNoteNamesVisible, setareNoteNamesVisible] = useState(false);
  const [root, setRoot] = useState(undefined);
  const [appCode, setAppCode] = useState('');
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

  function handleNoteNamesVisible() {
    setareNoteNamesVisible(!areNoteNamesVisible);
  }

  useEffect(() => {
    setFilteredLists(Music.getFilterdLists(isNoteSelected, root));
    setAppCode(`${isNoteSelected.map((el) => Number(el)).join('')}//${root}`);
  }, [isNoteSelected, root]);

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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar
        areNoteNamesVisible={areNoteNamesVisible}
        handleNoteNamesVisible={handleNoteNamesVisible}
      />

      <div className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys
          isNoteSelected={isNoteSelected}
          root={root}
          areNoteNamesVisible={areNoteNamesVisible}
          screenSize={screenSize}
          handleKeyPress={handleKeyPress}
        />
        <ModeController filteredLists={filteredLists} appCode={appCode} />
      </div>
    </div>
  );
}

export default App;
