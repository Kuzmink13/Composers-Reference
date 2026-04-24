/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useStore } from '../zustand/hooks';
import { isEqual } from 'lodash';
import * as filters from '../logic/filters';

function ModeButton({ buttonCardinality }) {
  const changeCardinality = useStore((state) => state.changeCardinality);
  const modeList = useStore(
    (state) =>
      state.notes.modeList
        .filter(filters.byRoot(state.notes.root))
        .filter(filters.byCardinality(buttonCardinality))
        .filter(
          filters.bySelection(state.notes.notes, state.selectionFilter)
        )
        .filter(filters.byTonality(state.tonalities)),
    isEqual
  );
  const cardinality = useStore((state) => state.cardinality);
  const isSelected = buttonCardinality === cardinality;
  const buttonLabel = buttonCardinality.string;

  return (
    <div
      className={`sm:p-1 mx-0 sm:mx-6 lg:mx-12 border-t border-transparent ${
        isSelected && 'border-gray-900'
      }`}
    >
      <button
        aria-label={`select ${buttonLabel.toLowerCase()} note mode list`}
        onClick={() => changeCardinality(buttonCardinality)}
        className="text-xs sm:text-base tab-selection py-2 px-1 sm:px-2 font-semibold tracking-wider cursor-pointer"
      >
        <span className="text-gray-900">{buttonLabel}-NOTE</span>
        <span
          className={`font-bold text-xs ml-1 sm:ml-3 py-1 px-1 sm:px-2 rounded-3xl shadow-md ${
            isSelected ? 'text-white bg-gray-700' : 'text-gray-800 bg-gray-400'
          }`}
        >
          {modeList.length}
        </span>
      </button>
    </div>
  );
}

export default ModeButton;
