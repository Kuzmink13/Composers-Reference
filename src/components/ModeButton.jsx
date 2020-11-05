import React from 'react';

function ModeButton(props) {
  const isSelected = props.scaleList === props.selectedListIndex;

  return (
    <div
      onClick={() => props.handleSelectorChange(props.scaleList)}
      className={`p-3 mx-0 sm:mx-6 lg:mx-12 font-semibold tracking-wider cursor-pointer ${
        isSelected ? 'border-t border-gray-900' : 'text-gray-500'
      }`}
    >
      {props.scaleListString}-NOTE
      <span
        className={`text-white text-xs ml-3 py-1 px-2 align-text-middle rounded-full shadow-md ${
          isSelected ? 'bg-gray-700' : 'bg-gray-400'
        }`}
      >
        {props.listSize}
      </span>
    </div>
  );
}

export default ModeButton;
