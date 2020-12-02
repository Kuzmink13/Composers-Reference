import React from 'react';
import useLongPress from '../hooks/useLongPress';

import Keyboard from '../Keyboard';
import Utilities from '../Utilities';

const { keyNotes } = Utilities;

function Key(props) {
  const longPressEvent = useLongPress(
    (event) => props.handleKeyPress(event, props.value, true),
    (event) => props.handleKeyPress(event, props.value)
  );

  const isNoteSelected = props.isNoteSelected[props.value];
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
        props.isSmall ? '-small' : ''
      } key-${color}-${selection} p-2 font-semibold break-words text-center`}
    >
      {props.isOverlayActive && <div>{Keyboard.getKey(props.index)}</div>}
      {props.areNoteNamesVisible && (
        <div className={`${props.isSmall ? 'mt-1' : 'mt-4'}`}>
          {noteName.replace('/', ' ')}
        </div>
      )}
    </div>
  );
}

export default Key;
