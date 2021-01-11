import React from 'react';

import VexStaff from './VexStaff';

import { replaceSymbols } from '../logic/utilities';

import Mode from '../objects/Mode';

const VexFigure = ({
  pitches,
  pitchCenter,
  caption,
  autoMargins = false,
  showBox = true,
  mb6 = true,
}) => (
  <figure
    className={`${showBox && 'box'} p-2 ${mb6 ? 'mb-6' : 'mb-4'} mx-auto ${
      !autoMargins && 'mx-0'
    }`}
  >
    <VexStaff mode={new Mode(pitches, pitchCenter)} />
    {caption && (
      <div className="text-base font-medium text-gray-800 text-center mt-1">
        {replaceSymbols(caption)}
      </div>
    )}
  </figure>
);

export default VexFigure;
