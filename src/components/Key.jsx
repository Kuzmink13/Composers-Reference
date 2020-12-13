import React from 'react';
import useLongPress from '../hooks/useLongPress';

import Keyboard from '../logic/Keyboard';
import Utilities from '../logic/Utilities';

const { keyNotes } = Utilities;

function Key(props) {
  const longPressEvent = useLongPress(
    (event) => props.handleNoteSelection(event, props.value, true),
    (event) => props.handleNoteSelection(event, props.value)
  );

  const isNoteSelected = props.notes[props.value];
  const isNoteRoot = props.root === props.value;
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
      {props.areKeysShown && <div>{Keyboard.getKey(props.index)}</div>}
      {props.areNoteNamesShown && (
        <div className={`${props.isShort ? 'mt-1' : 'mt-4'}`}>
          {noteName.replace('/', ' ')}
        </div>
      )}
    </div>
  );
}

export default Key;
