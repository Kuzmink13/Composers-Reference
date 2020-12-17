import React, { useMemo } from 'react';
import Key from './Key';

import { octavesToDisplay, isShortModeActive } from '../hooks/useScreenSize';

import Utilities from '../logic/Utilities';

const { notesInOctave } = Utilities;

function Keys(props) {
  const isShort = isShortModeActive(props.screenHeight);

  const keys = useMemo(() => {
    return Array.from(
      Array(notesInOctave * octavesToDisplay(props.screenWidth)),
      (el, i) => (
        <Key
          key={i}
          value={Utilities.octaveMod(i)}
          index={i}
          isShort={isShort}
        />
      )
    );
  }, [isShort, props.screenWidth]);

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
