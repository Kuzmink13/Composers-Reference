/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useStore } from '../zustand/hooks';

import { SUPPORTED_CLEFS, SUPPORTED_TONALITIES } from '../constants';

function Options() {
  const changeClef = useStore((state) => state.changeClef);
  const clearOverlays = useStore((state) => state.clearOverlays);
  const guideReset = useStore((state) => state.guideReset);
  const resetClef = useStore((state) => state.resetClef);
  const resetSelectionFilter = useStore((state) => state.resetSelectionFilter);
  const resetTonalities = useStore((state) => state.resetTonalities);
  const toggleGuideDismissed = useStore((state) => state.toggleGuideDismissed);
  const toggleKeyOverlay = useStore((state) => state.toggleKeyOverlay);
  const toggleNoteOverlay = useStore((state) => state.toggleNoteOverlay);
  const toggleSelectionFilter = useStore(
    (state) => state.toggleSelectionFilter
  );
  const toggleTonality = useStore((state) => state.toggleTonality);
  const clef = useStore((state) => state.clef);
  const tonalities = useStore((state) => state.tonalities);

  const generalOptions = [
    {
      id: 'keyboard-overlay',
      text: 'Display keyboard overlay',
      checked: useStore((state) => state.overlay.areKeysShown),
      onChange: () => toggleKeyOverlay(),
    },
    {
      id: 'names-on-keys',
      text: 'Display note names on keys',
      checked: useStore((state) => state.overlay.areNoteNamesShown),
      onChange: () => toggleNoteOverlay(),
    },
    {
      id: 'root-scale-display',
      text: 'Display scale only if its tonic is selected',
      checked: useStore((state) => state.selectionFilter),
      onChange: () => toggleSelectionFilter(),
    },
    {
      id: 'quick guide display',
      text: "Don't show Quick Start Guide",
      checked: useStore((state) => state.quickGuide.isDismissed),
      onChange: () => toggleGuideDismissed(),
    },
  ];

  return (
    <form
      className="box pop-out drop-down 
      flex flex-col
      mt-10 ml-2 mr-16 p-4
      font-semibold text-sm sm:text-base leading-none"
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
              onChange={() => el.onChange()}
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
        {Object.values(SUPPORTED_CLEFS).map((el) => (
          <div key={el} className="flex items-center pb-1">
            <input
              id={el}
              type="radio"
              name="clef"
              className="mx-2 cursor-pointer"
              onChange={() => changeClef(el)}
              checked={el === clef}
            />
            <label htmlFor={el} className="cursor-pointer">
              {el.charAt(0).toUpperCase() + el.slice(1)}
            </label>
          </div>
        ))}
      </fieldset>

      {/* TONALITY SELECTION */}
      <fieldset className="pb-2">
        <legend className="pb-2">Exclude scale-families:</legend>
        {SUPPORTED_TONALITIES.map((tonality, i) => (
          <div key={tonality.name} className="flex items-center pb-1">
            <input
              id={tonality.name}
              type="checkbox"
              className="mx-2 cursor-pointer"
              onChange={() => toggleTonality(i)}
              checked={!tonalities[i]}
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
        onClick={(event) => {
          event.preventDefault();
          clearOverlays();
          resetSelectionFilter();
          guideReset();
          resetClef();
          resetTonalities();
        }}
      >
        <div className="btn btn-text btn-p cursor-pointer leading-normal">
          REVERT TO DEFAULT
        </div>
      </button>
    </form>
  );
}

export default Options;
