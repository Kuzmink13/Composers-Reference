import React, { Fragment, useEffect } from 'react';
import { createFocusTrap } from 'focus-trap';

import Chords from '../Chords';
import VexStaff from './VexStaff';

import Music from '../Music';

function ModeCard(props) {
  // FOCUS TRAP
  useEffect(() => {
    const container = document.getElementById('mode-card');

    const focusTrap = createFocusTrap('#mode-card', {
      allowOutsideClick: true,
      onActivate: function () {
        container.classList.add('trap', 'is-active');
      },
      onDeactivate: function () {
        container.classList.remove('is-active');
      },
    });

    focusTrap.activate();

    return () => {
      focusTrap.deactivate();
    };
  });

  // REMOVE CLOSE ON CLICK EFFECT
  function cancelClose(event) {
    event.stopPropagation();
  }

  // ANIMATION
  useEffect(() => {
    if (props.showAnimation) {
      const container = document.getElementById('mode-card');
      container.classList.remove('scale-95', 'opacity-0');
      container.classList.add('scale-100', 'opacity-100');
    }
  });

  // RENDER
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
      onClick={cancelClose}
      id="mode-card"
      className={`text-sm sm:text-base relative mode-card
      ${
        props.showAnimation &&
        'transform scale-95 opacity-0 transition delay-25 duration-50'
      }`}
    >
      {/* MODE CARD HEADING */}
      <hgroup>
        <h2
          tabIndex="0"
          className="text-base sm:text-lg font-bold uppercase tracking-widest text-center focus:outline-none"
        >
          {props.modeName}
        </h2>
        <h3 className="text-sm sm:text-base italic tracking-wider text-center lowercase mb-3">
          {`from the ${props.parentTonality} scale family`}
        </h3>
      </hgroup>

      <VexStaff {...props} />

      {/* NEXT/PREVIOUS MODE BUTTONS */}
      <div className="mt-1 w-28 flex justify-between">
        <button
          name="previous mode-card"
          className="tab-selection p-2 m-1 text-gray-600 hover:text-gray-800"
          onClick={() =>
            props.getCard(Music.modeShift(props.absolutePitches, false), false)
          }
        >
          <svg
            className="h-5 w-5 fill-current cursor-pointer"
            viewBox="0 0 20 20"
          >
            <path d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z" />
          </svg>
        </button>

        <button
          name="next mode-card"
          className="tab-selection p-2 m-1 text-gray-600 hover:text-gray-800"
          onClick={() =>
            props.getCard(Music.modeShift(props.absolutePitches), false)
          }
        >
          <svg
            className="h-5 w-5 fill-current cursor-pointer"
            viewBox="0 0 20 20"
          >
            <path d="M16.172 9l-6.071-6.071 1.414-1.414L20 10l-.707.707-7.778 7.778-1.414-1.414L16.172 11H0V9z" />
          </svg>
        </button>
      </div>

      {/* CHORD TABLE */}
      <table
        className="tab-selection sm:p-2 block max-h-card overflow-y-auto scrolling-auto"
        tabIndex="0"
      >
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
                <th className="font-semibold text-center px-2 sm:px-3 pt-1 border-r border-gray-400">
                  {`${chordRoot}${chord}`.trim()}
                </th>
                <td className="text-center px-2 sm:px-3 pt-1 border-r border-gray-400">
                  {names.join('-')}
                </td>
                <td className="text-center px-2 sm:px-3 pt-1">
                  {degrees.join('-')}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>

      {/* CLOSE MODE-CARD BUTTON */}
      <button
        name="close mode-card"
        className="absolute top-0 right-0 tab-selection p-2 m-1 text-gray-600 hover:text-gray-800"
        onClick={props.closeCard}
      >
        <svg
          className="h-4 w-4 fill-current cursor-pointer"
          viewBox="0 0 20 20"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </button>
    </div>
  );
}

export default ModeCard;
