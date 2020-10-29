import React, { useState } from 'react';
import Navbar from './Navbar';
import Keys from './Keys';
import ModeController from './ModeController';
import Music from '../Music';
import Utilities from '../Utilities';

const { notesInOctave, supportedScaleLengths } = Utilities;

function App() {
  const [isNoteSelected, setIsNoteSelected] = useState(
    Array.from(Array(notesInOctave), () => false)
  );
  const [root, setRoot] = useState(undefined);
  const [filteredLists, setFilteredLists] = useState(
    Array.from(Array(supportedScaleLengths.length), () => [])
  );
  const [areNoteNamesShownOnKeys] = useState(false);

  function handleKeyPress(pressedNote, isRootPress) {
    const isKeyGettingPressed = (i) => i === pressedNote;
    const isPressedNoteCurrentRoot = pressedNote === root;
    const newNote = isRootPress ? true : !isNoteSelected[pressedNote];

    const NewIsNoteSelected = isNoteSelected.map((key, i) =>
      isKeyGettingPressed(i) ? newNote : key
    );

    const newRoot = isPressedNoteCurrentRoot
      ? undefined
      : isRootPress
      ? pressedNote
      : root;

    setIsNoteSelected(NewIsNoteSelected);
    setRoot(newRoot);
    setFilteredLists(Music.getFilterdLists(NewIsNoteSelected, newRoot));
  }

  const appCode = `${isNoteSelected.map((el) => Number(el)).join('')}//${root}`;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />

      <div className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys
          isNoteSelected={isNoteSelected}
          root={root}
          areNoteNamesShownOnKeys={areNoteNamesShownOnKeys}
          handleKeyPress={handleKeyPress}
        />
        <ModeController filteredLists={filteredLists} appCode={appCode} />
      </div>
    </div>
  );
}

export default App;
