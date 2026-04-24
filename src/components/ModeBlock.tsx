/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VexStaff from './VexStaff';

import { openModeCard } from '../redux/actions';
import { getClef } from '../redux/selectors';

function ModeBlock({ mode }) {
  const dispatch = useDispatch();
  const clef = useSelector(getClef);

  return (
    <button
      aria-label={`open mode-card for ${mode.getModeName()}`}
      onClick={() => dispatch(openModeCard(mode))}
      className="tab-selection m-1 p-1"
    >
      <div className="box p-2 hover:shadow-md">
        <h2 className="text-center tracking-wider font-semibold">
          {mode.getModeName()}
        </h2>
        <VexStaff {...{ mode, clef }} />
      </div>
    </button>
  );
}

export default ModeBlock;
