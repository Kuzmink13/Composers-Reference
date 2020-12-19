import React from 'react';
import * as svg from '../assets/svg.json';

import VexStaff from './VexStaff';
import ChordTable from './ChordTable';

import useKeyboardShift from '../hooks/useKeyboardShift';
import useLongPress from '../hooks/useLongPress';

function ModeCard({ mode, clef, openModeCard }) {
  const { absoluteMC, modeName, parentTonality } = mode.getModeProperties();

  const shift = {
    relative: (isFwShift) => {
      openModeCard(mode.relativeShift(isFwShift));
    },
    parallel: (isFwShift) => {
      openModeCard(mode.parallelShift(isFwShift));
    },
    key: (isFwShift) => {
      openModeCard(mode.keyShift(isFwShift));
    },
    relativeBrightness: (isFwShift) => {
      openModeCard(mode.relativeBrightnessShift(isFwShift));
    },
  };

  useKeyboardShift(shift);

  const buttons = [
    {
      name: 'ArrowLeft',
      clicks: useLongPress(
        () => shift.relativeBrightness(false),
        () => shift.relative(false)
      ),
      path: svg.left,
    },
    {
      name: 'ArrowDown',
      clicks: useLongPress(
        () => shift.key(false),
        () => shift.parallel(false)
      ),
      path: svg.down,
    },
    {
      name: 'ArrowUp',
      clicks: useLongPress(
        () => shift.key(true),
        () => shift.parallel(true)
      ),
      path: svg.up,
    },
    {
      name: 'ArrowRight',
      clicks: useLongPress(
        () => shift.relativeBrightness(true),
        () => shift.relative(true)
      ),
      path: svg.right,
    },
  ];

  return (
    <div
      className="flex flex-col items-center relative py-6
                text-gray-800 text-sm sm:text-base tracking-tight"
    >
      {/* MODE CARD HEADING */}
      <hgroup>
        <h2
          tabIndex="0"
          className="text-base sm:text-lg font-bold uppercase tracking-widest text-center focus:outline-none"
        >
          {modeName}
        </h2>
        <h3 className="text-sm sm:text-base italic tracking-wider text-center lowercase mb-3">
          {`from the ${parentTonality} scale family`}
        </h3>
      </hgroup>

      {/* SCALE FIGURE*/}
      <VexStaff key={absoluteMC} {...{ mode, clef }} />

      {/* MODE-SHIFT BUTTON PANEL */}
      <div className="flex">
        {buttons.map((button) => (
          <button
            name={button.name}
            key={button.name}
            className="tab-selection p-2 text-gray-600 hover:text-gray-800"
            {...button.clicks}
          >
            <svg
              className="h-5 w-5 fill-current cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d={button.path} />
            </svg>
          </button>
        ))}
      </div>

      {/* CHORD TABLE */}
      <ChordTable {...{ mode }} />
    </div>
  );
}

export default ModeCard;
