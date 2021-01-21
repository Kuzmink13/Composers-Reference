import React from 'react';
import VexStaff from './VexStaff';

import { useModeContext } from '../contexts/ModeContext';

function ModeBlock({ mode }) {
  const { clef, openModeCard } = useModeContext();

  return (
    <button
      aria-label={`open mode-card for ${mode.getModeName()}`}
      onClick={() => openModeCard(mode)}
      className="tab-selection m-1 p-1"
    >
      <div className="box p-2 hover:shadow-md">
        <h2 className="text-center tracking-wider font-semibold">
          {mode.getModeName()}
        </h2>
        <VexStaff {...{ mode, clef }} />
      </div>
    </button>
  );
}

export default ModeBlock;
