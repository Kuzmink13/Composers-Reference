import React from 'react';
import * as keyMap from '../assets/keyMap.json';

import { useKeyContext } from '../contexts/KeyContext';

import useLongPress from '../hooks/useLongPress';

import Utilities from '../logic/Utilities';

const { keyNotes } = Utilities;

function Key({ value, index, isShort }) {
  const {
    notes,
    root,
    areKeysShown,
    areNoteNamesShown,
    handleNoteSelection,
  } = useKeyContext();

  const longPressEvent = useLongPress(
    (event) => handleNoteSelection(event, value, true),
    (event) => handleNoteSelection(event, value)
  );

  const isKeySelected = notes[value];
  const isKeyRoot = root === value;
  const keyNoteName = keyNotes[value].absoluteName;
  const keyColor = keyNotes[value].isWhite ? 'white' : 'black';
  const selectionType = isKeySelected
    ? isKeyRoot
      ? 'root'
      : 'selected'
    : 'unselected';

  return (
    <div
      {...longPressEvent}
      className={`key key-${keyColor}${
        isShort ? '-small' : ''
      } key-${keyColor}-${selectionType} p-2 font-semibold break-words text-center`}
    >
      {areKeysShown && <div>{keyMap.noteToKey[index]}</div>}
      {areNoteNamesShown && (
        <div className={`${isShort ? 'mt-1' : 'mt-4'}`}>
          {keyNoteName.replace('/', ' ')}
        </div>
      )}
    </div>
  );
}

export default Key;
