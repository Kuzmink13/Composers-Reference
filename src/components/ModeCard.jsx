import React from 'react';
import VexStaff from './VexStaff';
import Chords from '../Chords';

function ModeCard(props) {
  const keyPrefix = props.modeName.split(' ')[0];
  const modeChords = Chords.chordGenerator(
    props.pitchCenter,
    props.modeCode,
    props.abstractPitches
  );

  return (
    <div className="relative flex flex-col p-8 items-center w-full max-w-md m-auto border border-gray-400 bg-white rounded-lg shadow-xl">
      {props.modeName}
      <VexStaff {...props} />
      {Array.from(modeChords, ([chord, names, notes]) => (
        <div key={chord} className="flex justify-between w-full">
          <div>{`${keyPrefix}${chord}`.trim()}</div>
          <div>{names.join('-')}</div>
          <div>{notes.join(' ')}</div>
        </div>
      ))}
    </div>
  );
}

export default ModeCard;
