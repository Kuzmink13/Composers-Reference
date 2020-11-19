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

  return <div id={props.modeName}></div>;
}

export default VexStaff;
