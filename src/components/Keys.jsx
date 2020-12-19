import React, { useMemo } from 'react';
import Key from './Key';

import { octavesToDisplay, isShortModeActive } from '../hooks/useScreenSize';

import Utilities from '../logic/Utilities';

const { notesInOctave } = Utilities;

function Keys({ screenHeight, screenWidth }) {
  const isShort = isShortModeActive(screenHeight);

  const keys = useMemo(() => {
    return Array.from(
      Array(notesInOctave * octavesToDisplay(screenWidth)),
      (el, i) => (
        <Key
          key={i}
          value={Utilities.octaveMod(i)}
          index={i}
          isShort={isShort}
        />
      )
    );
  }, [isShort, screenWidth]);

  return (
    <div
      className={`mx-8 ${
        isShort ? 'py-4' : 'py-8'
      } flex flex-row justify-center border-b border-gray-400`}
    >
      {keys}
    </div>
  );
}

export default Keys;
