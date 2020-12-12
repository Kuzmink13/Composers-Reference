import React, { Fragment } from 'react';
import Chords from '../logic/Chords';

function ChordTable(props) {
  const chordRoot = props.modeName.split(' ')[0];
  const modeChords = Chords.chordGenerator(
    props.pitchCenter,
    props.abstractPitches,
    props.absolutePitches
  );

  const isFirstChord = (chord) => chord === modeChords[0][0];
  const isThreeNoteChord = (names) => names.length === 3;

  return (
    <div
      className="tab-selection px-6 max-h-card overflow-y-auto scrolling-auto"
      tabIndex="0"
    >
      <table className="m-auto">
        <tbody>
          {Array.from(modeChords, ([chord, names, degrees]) => (
            <Fragment key={chord}>
              {/* ROW-DIVIDER */}
              {isThreeNoteChord(names) && !isFirstChord(chord) && (
                <tr>
                  <th colSpan="3" scope="row">
                    <hr className="border-t border-gray-400 mt-2 mb-1" />
                  </th>
                </tr>
              )}

              {/* TABLE ROW */}
              <tr key={chord}>
                <th className="whitespace-no-wrap font-semibold text-center pr-2 sm:pr-3 pt-1 border-r border-gray-400">
                  {`${chordRoot}${chord}`.trim()}
                </th>
                <td className="whitespace-no-wrap text-center px-2 sm:px-3 pt-1 border-r border-gray-400">
                  {names.join('-')}
                </td>
                <td className="whitespace-no-wrap text-center pl-2 sm:pl-3 pt-1">
                  {degrees.join('-')}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChordTable;
