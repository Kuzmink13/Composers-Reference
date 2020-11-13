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
    <div className="text-gray-800 relative flex flex-col py-8 items-center w-full max-w-md m-auto border border-gray-400 bg-white rounded-lg shadow-xl">
      <div className="text-lg font-bold uppercase tracking-widest">
        {props.modeName}
      </div>
      <VexStaff {...props} />
      <div className="mt-3">
        {Array.from(modeChords, ([chord, names, degrees]) => (
          <div key={chord} className="grid grid-cols-3 auto-cols-min">
            <div className="font-semibold text-center px-3 pt-1 border-r border-gray-400">
              {`${keyPrefix}${chord}`.trim()}
            </div>
            <div className="text-center px-3 pt-1 border-r border-gray-400">
              {names.join('-')}
            </div>
            <div className="text-center px-3 pt-1">{degrees.join('-')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModeCard;
