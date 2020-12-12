import React from 'react';
import Key from './Key';
import Utilities from '../logic/Utilities';

const { notesInOctave } = Utilities;

function Keys(props) {
  // SCREEN SIZE UTILITIES
  function octavesToDisplay() {
    const breakpoints = { small: 640, medium: 1024 };
    switch (true) {
      case props.screenWidth < breakpoints.small:
        return 1;
      case props.screenWidth < breakpoints.medium:
        return 2;
      default:
        return 3;
    }
  }

  function isShort() {
    const breakpoint = 820;
    return props.screenHeight < breakpoint;
  }

  // RENDER
  function generateKeys() {
    return Array.from(Array(notesInOctave * octavesToDisplay()), (el, i) => (
      <Key
        key={i}
        value={Utilities.octaveMod(i)}
        index={i}
        isShort={isShort()}
        {...props.keyProps}
      />
    ));
  }

  return (
    <div
      className={`mx-8 ${
        isShort() ? 'py-4' : 'py-8'
      } flex flex-row justify-center border-b border-gray-400`}
    >
      {generateKeys()}
    </div>
  );
}

export default Keys;
