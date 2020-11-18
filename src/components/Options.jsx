import React from 'react';
import Utilities from '../Utilities';

const { tonalities, supportedClefs } = Utilities;

function Options(props) {
  return (
    <div className="drop-down mr-16 px-4 py-2">
      <div className="flex flex-col items-start py-1">
        <div onClick={props.handleNoteNamesVisible} className="cursor-pointer">
          <input
            type="checkbox"
            className="mr-2"
            checked={props.areNoteNamesVisible}
          />
          Display note names on keys
        </div>
        <div
          onClick={props.handleIsFilteredBySelection}
          className="cursor-pointer"
        >
          <input
            type="checkbox"
            className="mr-2"
            checked={props.isFilteredBySelection}
          />
          Display scale only if its root is selected
        </div>
      </div>

      <div className="flex flex-col items-start py-1">
        Clef Selection:
        {supportedClefs.map((el) => (
          <div
            key={el}
            onClick={() => props.handleClefChange(el)}
            className="cursor-pointer"
          >
            <input
              type="radio"
              id={el}
              name="clef"
              className="mx-2"
              checked={el === props.clef}
            />
            {el}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start py-1">
        Exclude Tonalities:
        {tonalities.map((tonality, i) => (
          <div
            key={tonality.name}
            onClick={() => props.handleSelectedTonalityChange(i)}
            className="cursor-pointer"
          >
            <input
              type="checkbox"
              className="mx-2"
              checked={!props.selectedTonalities[i]}
            />
            {tonality.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center pt-4 pb-2">
        <div
          onClick={props.handleRevertSettings}
          className="btn cursor-pointer"
        >
          REVERT TO DEFAULT
        </div>
      </div>
    </div>
  );
}

export default Options;
