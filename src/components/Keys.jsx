import React, { useState, useEffect } from 'react';
import Key from './Key';
import Utilities from '../Utilities';

const { notesInOctave } = Utilities;

function Keys(props) {
  // SCREEN HEIGHT CONTROL
  const [screenHeight, setScreenHeight] = useState(getScreenHeight());

  function getScreenHeight() {
    return window.innerHeight < 720;
  }

  useEffect(() => {
    const handleResize = () => setScreenHeight(getScreenHeight());
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // RENDER
  function generateKeys() {
    return Array.from(Array(notesInOctave * props.screenSize), (el, i) => (
      <Key
        key={i}
        value={Utilities.octaveMod(i)}
        index={i}
        isSmall={screenHeight}
        {...props}
      />
    ));
  }

  return (
    <div className="mx-8 py-8 flex flex-row justify-center border-b border-gray-400">
      {generateKeys()}
    </div>
  );
}

export default Keys;
