import React from 'react';
import Utilities from '../Utilities';

const { keyNotes } = Utilities;

function Key(props) {
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
      onClick={() => props.handleKeyPress(props.value, false)}
      onDoubleClick={() => props.handleKeyPress(props.value, true)}
      className={`key key-${color} key-${color}-${selection}`}
    >
      {props.areNoteNamesVisible && keyNotes[props.value].isWhite && (
        <div className="p-2 font-semibold text-md">{noteName}</div>
      )}
    </div>
  );
}

export default Key;
