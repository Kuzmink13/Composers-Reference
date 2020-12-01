import React from 'react';

function ModeButton(props) {
  const isSelected = props.scaleList === props.selectedListIndex;

  return (
    <div
      className={`sm:p-1 mx-0 sm:mx-6 lg:mx-12 border-t border-transparent ${
        isSelected && 'border-gray-900'
      }`}
    >
      <button
        onClick={() => props.handleSelectorChange(props.scaleList)}
        className="text-xs sm:text-base tab-selection py-2 px-1 sm:px-2 font-semibold tracking-wider cursor-pointer"
      >
        <span className={isSelected ? 'text-gray-800' : 'text-gray-500'}>
          {props.scaleListString}-NOTE
        </span>
        <span
          className={`text-white text-xs ml-1 sm:ml-3 py-1 px-1 sm:px-2 rounded-full shadow-md ${
            isSelected ? 'bg-gray-700' : 'bg-gray-400'
          }`}
        >
          {props.listSize}
        </span>
      </button>
    </div>
  );
}

export default ModeButton;
