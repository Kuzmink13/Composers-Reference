import React, { useEffect } from 'react';
import VexScale from '../logic/VexScale';

function VexStaff({ mode, clef }) {
  const { pitchCenter, absolutePitches, modeName } = mode.getModeProperties();

  useEffect(() => {
    VexScale.generateStaff(modeName, pitchCenter, absolutePitches, clef);
    return () => {
      document.getElementById(modeName).innerHTML = '';
    };
  });

  return (
    <figure id={modeName} className="h-staff-height w-staff-width"></figure>
  );
}

export default VexStaff;
