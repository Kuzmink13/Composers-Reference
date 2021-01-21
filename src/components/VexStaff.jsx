import React from 'react';

import useVexScale from '../hooks/useVexScale';
import { supportedClefs } from '../hooks/useClef';

function VexStaff({ mode, clef = supportedClefs.treble }) {
  useVexScale(mode, clef);

  return (
    <figure
      id={mode.getAbsoluteModeCode()}
      className="h-staff-height w-staff-width"
      alt={mode.getScaleNotes()}
    ></figure>
  );
}

export default VexStaff;
