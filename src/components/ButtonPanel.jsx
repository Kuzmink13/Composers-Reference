import React from 'react';
import ModeButton from './ModeButton';

function ButtonPanel(props) {
  const buttons = ['SIX', 'SEVEN', 'EIGHT'];

  return (
    <div className="flex flex-row justify-center">
      {buttons.map((scaleListString, i) => (
        <ModeButton
          key={i}
          scaleList={i}
          scaleListString={scaleListString}
          selectedListIndex={props.selectedListIndex}
          listSize={props.filteredLists[i].length}
          handleSelectorChange={props.handleSelectorChange}
        />
      ))}
    </div>
  );
}

export default ButtonPanel;
