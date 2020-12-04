import React, { useEffect } from 'react';
import VexScale from '../VexScale';

function VexStaff(props) {
  useEffect(() => {
    VexScale.generateStaff(
      props.modeName,
      props.pitchCenter,
      props.absolutePitches,
      props.clef
    );
    return () => {
      document.getElementById(props.modeName).innerHTML = '';
    };
  });

  return (
    <figure
      id={props.modeName}
      className="h-staff-height w-staff-width"
    ></figure>
  );
}

export default VexStaff;
