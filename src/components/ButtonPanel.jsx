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
          listSize={props.filteredLists[i].length}
          {...props.modeButtonProps}
        />
      ))}
    </div>
  );
}

export default ButtonPanel;
