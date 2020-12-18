import React from 'react';
import VexStaff from './VexStaff';

import { useModeContext } from '../contexts/ModeContext';

function ModeBlock({ mode }) {
  const { clef, openModeCard } = useModeContext();
  const modeProps = mode.getModeProperties();

  return (
    <button
      onClick={() => openModeCard(mode)}
      className="tab-selection m-1 p-1"
    >
      <div className="box p-2 hover:shadow-md">
        <h2 className="text-center tracking-wider font-semibold">
          {modeProps.modeName}
        </h2>
        <VexStaff clef={clef} {...modeProps} />
      </div>
    </button>
  );
}

export default ModeBlock;
