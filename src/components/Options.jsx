import React, { Fragment } from 'react';
import Utilities from '../Utilities';

const { tonalities, supportedClefs } = Utilities;

function Options(props) {
  const isLineBreakNeeded = (arr, i) => i + 1 !== arr.length;

  return (
    <form className="drop-down mr-16 px-4 py-2">
      <h2 className="mx-auto py-1 font-bold tracking-widest">OPTIONS</h2>

      {/* GENERAL OPTIONS */}
      <fieldset className="py-1">
        <input
          id="names-on-keys"
          type="checkbox"
          className="mr-2 cursor-pointer"
          onChange={props.handleNoteNamesVisible}
          checked={props.areNoteNamesVisible}
        />
        <label htmlFor="names-on-keys" className="cursor-pointer">
          Display note names on keys
        </label>
        <br />

        <input
          id="root-scale-display"
          type="checkbox"
          className="mr-2 cursor-pointer"
          onChange={props.handleIsFilteredBySelection}
          checked={props.isFilteredBySelection}
        />
        <label htmlFor="root-scale-display" className="cursor-pointer">
          Display scale only if its root is selected
        </label>
      </fieldset>

      {/* CLEF SELECTION */}
      <fieldset className="py-1">
        <legend>Clef Selection:</legend>
        {supportedClefs.map((el, i, arr) => (
          <Fragment key={el}>
            <input
              id={el}
              type="radio"
              name="clef"
              className="mx-2 cursor-pointer"
              onChange={() => props.handleClefChange(el)}
              checked={el === props.clef}
            />
            <label htmlFor={el} className="cursor-pointer">
              {el.charAt(0).toUpperCase() + el.slice(1)}
            </label>
            {isLineBreakNeeded(arr, i) && <br />}
          </Fragment>
        ))}
      </fieldset>

      {/* TONALITY SELECTION */}
      <fieldset className="py-1">
        <legend>Exclude Tonalities:</legend>
        {tonalities.map((tonality, i, arr) => (
          <Fragment key={tonality.name}>
            <input
              id={tonality.name}
              type="checkbox"
              className="mx-2 cursor-pointer"
              onChange={() => props.handleSelectedTonalityChange(i)}
              checked={!props.selectedTonalities[i]}
            />
            <label htmlFor={tonality.name} className="cursor-pointer">
              {tonality.name}
            </label>
            {isLineBreakNeeded(arr, i) && <br />}
          </Fragment>
        ))}
      </fieldset>

      {/* RESET SETTINGS BUTTON */}
      <button
        className="btn mt-4 mb-2 mx-auto cursor-pointer"
        onClick={(event) => props.handleRevertSettings(event)}
      >
        REVERT TO DEFAULT
      </button>
    </form>
  );
}

export default Options;
