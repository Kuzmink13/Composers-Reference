import React, { useEffect } from 'react';
import VexScale from '../VexScale';

function ModeBlock(props) {
  useEffect(() => {
    VexScale.generateStaff(
      props.modeName,
      props.pitchCenter,
      props.modeCode,
      props.absolutePitches,
      props.clef
    );
  });

  return (
    <div
      onClick={() => props.getCard(props.abstractPitches)}
      className="m-2 p-2 bg-white border border-gray-400 rounded-lg text-center tracking-wide font-medium"
    >
      {props.modeName}
      <div id={props.modeName}></div>
    </div>
  );
}

export default ModeBlock;
