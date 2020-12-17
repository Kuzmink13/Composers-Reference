import React from 'react';

import ModeButton from './ModeButton';

const buttonLabels = ['SIX', 'SEVEN', 'EIGHT'];

function ButtonPanel({ scaleLists }) {
  return (
    <div className="flex flex-row justify-center">
      {buttonLabels.map((buttonLabel, i) => (
        <ModeButton
          key={i}
          listIndex={i}
          buttonLabel={buttonLabel}
          listSize={scaleLists[i].length}
        />
      ))}
    </div>
  );
}

export default ButtonPanel;
