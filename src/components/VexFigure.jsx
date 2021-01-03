import React from 'react';

import VexStaff from './VexStaff';

import { replaceSymbols } from '../logic/utilities';

import Mode from '../objects/Mode';

const VexFigure = ({ pitches, caption, autoMargins = false }) => (
  <figure className={`box p-2 mb-6 mx-auto ${!autoMargins && 'mx-0'}`}>
    <VexStaff mode={new Mode(pitches)} />
    <div className="text-base font-medium text-gray-800 text-center mt-1">
      {replaceSymbols(caption)}
    </div>
  </figure>
);

export default VexFigure;
