import React, { Fragment } from 'react';

import Chords from '../Chords';
import VexStaff from './VexStaff';

function ModeCard(props) {
  const chordRoot = props.modeName.split(' ')[0];
  const modeChords = Chords.chordGenerator(
    props.pitchCenter,
    props.abstractPitches,
    props.absolutePitches
  );

  const isFirstChord = (chord) => chord === modeChords[0][0];
  const isThreeNoteChord = (names) => names.length === 3;

  function cancelClose(event) {
    event.stopPropagation();
  }

  return (
    <div
      onClick={cancelClose}
      className="text-gray-800 relative flex flex-col py-8 items-center w-full max-w-md m-auto border border-gray-400 bg-white rounded-lg shadow-xl"
    >
      {/* Mode Card Heading */}
      <div className="text-lg font-bold uppercase tracking-widest">
        {props.modeName}
      </div>
      <div className="italic tracking-wider lowercase mb-3">{`from the ${props.parentTonality} scale family`}</div>

      <VexStaff {...props} />

      {/* Chord table */}
      <div className="max-h-card mt-5 overflow-y-auto scrolling-auto">
        {Array.from(modeChords, ([chord, names, degrees]) => (
          <Fragment key={chord}>
            {/* row-divider */}
            {isThreeNoteChord(names) && !isFirstChord(chord) && (
              <div className="border-t border-gray-400 mt-2 mb-1" />
            )}

            {/* table row */}
            <div key={chord} className="grid grid-cols-3 auto-cols-min">
              <div className="font-semibold text-center px-3 pt-1 border-r border-gray-400">
                {`${chordRoot}${chord}`.trim()}
              </div>
              <div className="text-center px-3 pt-1 border-r border-gray-400">
                {names.join('-')}
              </div>
              <div className="text-center px-3 pt-1">{degrees.join('-')}</div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ModeCard;
