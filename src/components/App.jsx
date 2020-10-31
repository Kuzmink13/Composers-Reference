import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';

const { notesInOctave, supportedScaleLengths } = Utilities;

function App() {
  /** An array of boolean values corresponding to whether a key at a given note
   * index is currently selected */
  const [isNoteSelected, setIsNoteSelected] = useState(
    Array(notesInOctave).fill(false)
  );
  /** An array containing lists of Mode objects that correspond to each
   * supported scale length and the application state*/
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );
  const [areNoteNamesShownOnKeys] = useState(false);
  const [root, setRoot] = useState(undefined);
  const [appCode, setAppCode] = useState('');
  const [screenSize, setScreenSize] = useState(getScreenSize());

  /**
   * Updates the application state based on a user note selection event
   * @param {Number} pressedNote - an index corresponding to the selected note
   * @param {Boolean} isRootPress - whether the selection also designates the
   * note as the root
   */
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

  /** Generates a new filteredList array and appCode after isNoteSelected or
   * root changes */
  useEffect(() => {
    setFilteredLists(Music.getFilterdLists(isNoteSelected, root));
    setAppCode(`${isNoteSelected.map((el) => Number(el)).join('')}//${root}`);
  }, [isNoteSelected, root]);

  /** Returns a value corresponding to the current screen-size breakpoint */
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

  /** Window-size event listener/handler */
  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys
          isNoteSelected={isNoteSelected}
          root={root}
          areNoteNamesShownOnKeys={areNoteNamesShownOnKeys}
          screenSize={screenSize}
          handleKeyPress={handleKeyPress}
        />
        <ModeController filteredLists={filteredLists} appCode={appCode} />
      </div>
    </div>
  );
}

export default App;
