/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';

import ModeButton from './ModeButton';

import { SUPPORTED_SCALE_LENGTHS } from '../constants';

function ButtonPanel() {
  return (
    <div className="flex-none flex flex-row justify-center">
      {Object.values(SUPPORTED_SCALE_LENGTHS).map((buttonLabel) => (
        <ModeButton key={buttonLabel} {...{ buttonLabel }} />
      ))}
    </div>
  );
}

export default ButtonPanel;
