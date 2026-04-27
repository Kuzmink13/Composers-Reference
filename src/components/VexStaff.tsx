/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */


import useVexScale from '../hooks/useVexScale';

import { SUPPORTED_CLEFS } from '../constants';
import type Mode from '../objects/Mode';
import type { Clef } from '../zustand/types';

interface VexStaffProps {
  mode: Mode;
  clef?: Clef;
  altID?: string;
}

function VexStaff({ mode, clef = SUPPORTED_CLEFS.TREBLE, altID }: VexStaffProps) {
  useVexScale(mode, clef, altID);

  return (
    <figure
      id={altID ?? mode.getAbsoluteModeCode()}
      className="h-staff-height w-staff-width"
      aria-label={mode.getScaleNotes().join(' ')}
    ></figure>
  );
}

export default VexStaff;
