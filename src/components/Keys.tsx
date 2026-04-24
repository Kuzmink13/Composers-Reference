/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Key from './Key';

import { notesInOctave, octaveMod } from '../logic/utilities';

import { getNumOctaves, isShortModeActive } from '../redux/selectors';

function Keys() {
  const isShort = useSelector(isShortModeActive);
  const numOctaves = useSelector(getNumOctaves);

  const keys = useMemo(() => {
    return Array.from(Array(notesInOctave * numOctaves), (el, i) => (
      <Key key={i} value={octaveMod(i)} index={i} />
    ));
  }, [numOctaves]);

  return (
    <div
      className={`mx-8 ${
        isShort ? 'py-4' : 'py-8'
      } flex-none flex flex-row justify-center border-b border-gray-400`}
    >
      {keys}
    </div>
  );
}

export default Keys;
