import React, { useEffect } from 'react';
import { createFocusTrap } from 'focus-trap';

import Utilities from '../Utilities';

const { tonalities, supportedClefs } = Utilities;

function Options(props) {
  // FOCUS TRAP
  useEffect(() => {
    const container = document.getElementById('options');

    const focusTrap = createFocusTrap('#options', {
      allowOutsideClick: true,
      onActivate: function () {
        container.classList.add('trap', 'is-active');
      },
      onDeactivate: function () {
        container.classList.remove('is-active');
      },
    });

    focusTrap.activate();

    return () => {
      focusTrap.deactivate();
    };
  });

  // GENERAL OPTIONS
  const generalOptions = [
    {
      id: 'keyboard-overlay',
      text: 'Display keyboard overlay',
      onChange: props.handleOverlayToggle,
      checked: props.isOverlayActive,
    },
    {
      id: 'names-on-keys',
      text: 'Display note names on keys',
      onChange: props.handleNoteNamesVisible,
      checked: props.areNoteNamesVisible,
    },
    {
      id: 'root-scale-display',
      text: 'Display scale only if its tonic is selected',
      onChange: props.handleIsFilteredBySelection,
      checked: props.isFilteredBySelection,
    },
  ];

  // RENDER
  return (
    <form
      id="options"
      className="drop-down text-sm sm:text-base mt-10 ml-2 mr-16 p-4 leading-none"
    >
      <h2 className="mx-auto pb-3 font-bold tracking-widest">OPTIONS</h2>

      {/* GENERAL OPTIONS */}
      <fieldset className="pb-2">
        {generalOptions.map((el) => (
          <div key={el.id} className="flex items-center pb-1">
            <input
              id={el.id}
              type="checkbox"
              className="mr-2 cursor-pointer"
              onChange={el.onChange}
              checked={el.checked}
            />
            <label htmlFor={el.id} className="cursor-pointer">
              {el.text}
            </label>
          </div>
        ))}
      </fieldset>

      {/* CLEF SELECTION */}
      <fieldset className="pb-2">
        <legend className="pb-2">Clef Selection:</legend>
        {supportedClefs.map((el) => (
          <div key={el} className="flex items-center pb-1">
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
          </div>
        ))}
      </fieldset>

      {/* TONALITY SELECTION */}
      <fieldset className="pb-2">
        <legend className="pb-2">Exclude Tonalities:</legend>
        {tonalities.map((tonality, i) => (
          <div key={tonality.name} className="flex items-center pb-1">
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
          </div>
        ))}
      </fieldset>

      {/* RESET SETTINGS BUTTON */}
      <button
        className="tab-selection p-1 mx-auto"
        onClick={(event) => props.handleRevertSettings(event)}
      >
        <div className="btn cursor-pointer leading-normal">
          REVERT TO DEFAULT
        </div>
      </button>
    </form>
  );
}

export default Options;
