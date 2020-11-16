import React from 'react';
import Utilities from '../Utilities';

const { isWhite, absoluteNoteNames } = Utilities;

function Key(props) {
  const isNoteSelected = props.isNoteSelected[props.value];
  const isNoteRoot = props.root === props.value;
  const noteName = absoluteNoteNames[props.value];
  const color = isWhite[props.value] ? 'white' : 'black';
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
      {props.areNoteNamesVisible && isWhite[props.value] && (
        <div className="p-2 font-semibold text-md">{noteName}</div>
      )}
    </div>
  );
}

export default Key;
