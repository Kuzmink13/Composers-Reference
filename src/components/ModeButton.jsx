import React from 'react';

import { useModeButtonContext } from '../contexts/ModeButtonContext';

function ModeButton({ listIndex, buttonLabel, listSize }) {
  const { selectedListIndex, handleSelectorChange } = useModeButtonContext();
  const isSelected = listIndex === selectedListIndex;

  return (
    <div
      className={`sm:p-1 mx-0 sm:mx-6 lg:mx-12 border-t border-transparent ${
        isSelected && 'border-gray-900'
      }`}
    >
      <button
        aria-label={`select ${buttonLabel.toLowerCase()} note mode list`}
        onClick={() => handleSelectorChange(listIndex)}
        className="text-xs sm:text-base tab-selection py-2 px-1 sm:px-2 font-semibold tracking-wider cursor-pointer"
      >
        <span className="text-gray-900">{buttonLabel}-NOTE</span>
        <span
          className={`font-bold text-xs ml-1 sm:ml-3 py-1 px-1 sm:px-2 rounded-full shadow-md ${
            isSelected ? 'text-white bg-gray-700' : 'text-gray-800 bg-gray-400'
          }`}
        >
          {listSize}
        </span>
      </button>
    </div>
  );
}

export default ModeButton;
