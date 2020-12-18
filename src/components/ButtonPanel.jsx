import React from 'react';

import ModeButton from './ModeButton';

const buttonLabels = ['SIX', 'SEVEN', 'EIGHT'];

function ButtonPanel({ modeLists }) {
  return (
    <div className="flex flex-row justify-center">
      {buttonLabels.map((buttonLabel, i) => (
        <ModeButton
          key={i}
          listIndex={i}
          buttonLabel={buttonLabel}
          listSize={modeLists[i].length}
        />
      ))}
    </div>
  );
}

export default ButtonPanel;
