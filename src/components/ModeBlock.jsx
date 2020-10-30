import React, { useEffect } from 'react';
import VexScale from '../VexScale';

function ModeBlock(props) {
  useEffect(() => {
    VexScale.generateStaff(
      props.modeName,
      props.pitchCenter,
      props.modeCode,
      props.absolutePitches
    );
  });

  return (
    <div className=" h-32 m-2 p-2 bg-white border border-gray-400 rounded-lg text-center text-gray-800">
      {props.modeName}
      <div id={props.modeName}></div>
    </div>
  );
}

export default ModeBlock;
