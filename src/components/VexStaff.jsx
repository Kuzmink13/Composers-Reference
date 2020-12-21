import React from 'react';
import useVexScale from '../hooks/useVexScale';

function VexStaff({ mode, clef }) {
  useVexScale(mode, clef);

  return (
    <figure
      id={mode.getModeName()}
      className="h-staff-height w-staff-width"
    ></figure>
  );
}

export default VexStaff;
