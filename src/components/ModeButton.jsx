import React from 'react';

function ModeButton(props) {
  const isSelected = props.scaleList === props.selectedListIndex;

  return (
    <div
      className={`p-1 mx-0 sm:mx-6 lg:mx-12 border-t border-transparent ${
        isSelected && 'border-gray-900'
      }`}
    >
      <button
        onClick={() => props.handleSelectorChange(props.scaleList)}
        className="text-sm sm:text-base tab-selection p-2 font-semibold tracking-wider cursor-pointer"
      >
        <span className={isSelected ? 'text-gray-800' : 'text-gray-500'}>
          {props.scaleListString}-NOTE
        </span>
        <span
          className={`text-white text-xs ml-3 py-1 px-2 rounded-full shadow-md ${
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
