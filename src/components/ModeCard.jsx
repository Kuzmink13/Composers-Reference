import React from 'react';
import * as svg from '../assets/svg.json';

import VexStaff from './VexStaff';
import ChordTable from './ChordTable';

import useShift from '../hooks/useShift';
import useLongPress from '../hooks/useLongPress';

function ModeCard({ mode, clef, openModeCard }) {
  const modeName = mode.getModeName();
  const [shift] = useShift(mode, openModeCard);

  const buttons = [
    {
      name: 'ArrowLeft',
      clicks: useLongPress(
        (e) => shift.LR(e, false, true),
        (e) => shift.LR(e, false)
      ),
      path: svg.left,
    },
    {
      name: 'ArrowDown',
      clicks: useLongPress(
        (e) => shift.UD(e, false, true),
        (e) => shift.UD(e, false)
      ),
      path: svg.down,
    },
    {
      name: 'ArrowUp',
      clicks: useLongPress(
        (e) => shift.UD(e, true, true),
        (e) => shift.UD(e, true)
      ),
      path: svg.up,
    },
    {
      name: 'ArrowRight',
      clicks: useLongPress(
        (e) => shift.LR(e, true, true),
        (e) => shift.LR(e, true)
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
          {`from the ${mode.getParentTonality()} scale family`}
        </h3>
      </hgroup>

      {/* SCALE FIGURE*/}
      <VexStaff key={modeName} {...{ mode, clef }} />

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
