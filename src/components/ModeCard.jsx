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
      <hgroup>
        <h2 className="text-lg font-bold uppercase tracking-widest text-center">
          {props.modeName}
        </h2>
        <h3 className="italic tracking-wider lowercase mb-3">
          {`from the ${props.parentTonality} scale family`}
        </h3>
      </hgroup>

      <VexStaff {...props} />

      {/* Chord table */}
      <table className="mt-5 block max-h-card overflow-y-auto scrolling-auto">
        <tbody>
          {Array.from(modeChords, ([chord, names, degrees]) => (
            <Fragment key={chord}>
              {/* row-divider */}
              {isThreeNoteChord(names) && !isFirstChord(chord) && (
                <tr>
                  <th colSpan="3" scope="row">
                    <hr className="border-t border-gray-400 mt-2 mb-1" />
                  </th>
                </tr>
              )}

              {/* table row */}
              <tr key={chord}>
                <th className="font-semibold text-center px-3 pt-1 border-r border-gray-400">
                  {`${chordRoot}${chord}`.trim()}
                </th>
                <td className="text-center px-3 pt-1 border-r border-gray-400">
                  {names.join('-')}
                </td>
                <td className="text-center px-3 pt-1">{degrees.join('-')}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModeCard;
