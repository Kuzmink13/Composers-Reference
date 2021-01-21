/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import * as keyMap from '../assets/keyMap.json';
import * as keyNotes from '../assets/notes.json';

import { useKeyContext } from '../contexts/KeyContext';

import useLongPress from '../hooks/useLongPress';

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
  const keyNoteName = keyNotes.default[value].absoluteName;
  const keyColor = keyNotes.default[value].isWhite ? 'white' : 'black';
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
