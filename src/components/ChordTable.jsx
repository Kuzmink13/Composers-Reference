import React, { Fragment } from 'react';

function ChordTable({ mode }) {
  const modeRoot = mode.getModeRoot();
  const chordList = mode.getChordList();

  const isFirstChord = (chordName) => chordName === chordList[0].chordName;
  const isThreeNoteChord = (noteNames) => noteNames.length === 3;

  return (
    <div className="tab-selection px-6 max-h-card overflow-y-auto" tabIndex="0">
      <table className="m-auto">
        <tbody>
          {Array.from(chordList, ({ chordName, noteNames, scaleDegrees }) => (
            <Fragment key={chordName}>
              {/* ROW-DIVIDER */}
              {isThreeNoteChord(noteNames) && !isFirstChord(chordName) && (
                <tr>
                  <th colSpan="3" scope="row">
                    <hr className="border-t border-gray-400 mt-2 mb-1" />
                  </th>
                </tr>
              )}

              {/* TABLE ROW */}
              <tr key={chordName}>
                <th className="whitespace-no-wrap font-semibold text-center pr-2 sm:pr-3 pt-1 border-r border-gray-400">
                  {`${modeRoot}${chordName}`.trim()}
                </th>
                <td className="whitespace-no-wrap text-center px-2 sm:px-3 pt-1 border-r border-gray-400">
                  {noteNames.join('-')}
                </td>
                <td className="whitespace-no-wrap text-center pl-2 sm:pl-3 pt-1">
                  {scaleDegrees.join('-')}
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
