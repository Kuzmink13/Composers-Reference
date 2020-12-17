import React from 'react';
import VexStaff from './VexStaff';

import { useModeContext } from '../contexts/ModeContext';

function ModeBlock(props) {
  const { clef, openModeCard } = useModeContext();

  return (
    <button
      onClick={() => openModeCard(props.modeProps)}
      className="tab-selection m-1 p-1"
    >
      <div className="box p-2 hover:shadow-md">
        <h2 className="text-center tracking-wider font-semibold">
          {props.modeProps.modeName}
        </h2>
        <VexStaff clef={clef} {...props.modeProps} />
      </div>
    </button>
  );
}

export default ModeBlock;
