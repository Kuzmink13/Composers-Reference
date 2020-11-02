import React from 'react';
import Utilities from '../Utilities';

const { tonalityNames } = Utilities;

function Options(props) {
  return (
    <div className="drop-down mr-16 px-4 py-2">
      <div className="py-1">
        <div onClick={props.handleNoteNamesVisible}>
          <input
            type="checkbox"
            className="mr-2"
            checked={props.areNoteNamesVisible}
          />
          Display note names on keys
        </div>
        <div onClick={props.handleIsFilteredBySelection}>
          <input
            type="checkbox"
            className="mr-2"
            checked={props.isFilteredBySelection}
          />
          Display scale only if its root is selected
        </div>
      </div>

      <div className="py-1">
        Clef Selection:
        <div>
          <input type="radio" name="clef" className="mx-2" />
          Treble
        </div>
        <div>
          <input type="radio" name="clef" className="mx-2" />
          Alto
        </div>
        <div>
          <input type="radio" name="clef" className="mx-2" />
          Bass
        </div>
      </div>

      <div className="py-1">
        Exclude Tonalities:
        {tonalityNames.map((el, i) => (
          <div onClick={() => props.handleSelectedTonalityChange(i)}>
            <input
              type="checkbox"
              className="mx-2"
              checked={!props.selectedTonalities[i]}
            />
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Options;
