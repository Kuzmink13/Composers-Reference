import React from 'react';

import { useKeyContext } from '../contexts/KeyContext';

import useLongPress from '../hooks/useLongPress';

import Keyboard from '../logic/Keyboard';
import Utilities from '../logic/Utilities';

const { keyNotes } = Utilities;

function Key(props) {
  const {
    notes,
    root,
    areKeysShown,
    areNoteNamesShown,
    handleNoteSelection,
  } = useKeyContext();

  const longPressEvent = useLongPress(
    (event) => handleNoteSelection(event, props.value, true),
    (event) => handleNoteSelection(event, props.value)
  );

  const isNoteSelected = notes[props.value];
  const isNoteRoot = root === props.value;
  const noteName = keyNotes[props.value].absoluteName;
  const color = keyNotes[props.value].isWhite ? 'white' : 'black';
  const selection = isNoteSelected
    ? isNoteRoot
      ? 'root'
      : 'selected'
    : 'unselected';

  return (
    <div
      {...longPressEvent}
      className={`key key-${color}${
        props.isShort ? '-small' : ''
      } key-${color}-${selection} p-2 font-semibold break-words text-center`}
    >
      {areKeysShown && <div>{Keyboard.getKey(props.index)}</div>}
      {areNoteNamesShown && (
        <div className={`${props.isShort ? 'mt-1' : 'mt-4'}`}>
          {noteName.replace('/', ' ')}
        </div>
      )}
    </div>
  );
}

export default Key;
