import React from 'react';
import Key from './Key';
import Utilities from '../Utilities';

const { notesInOctave } = Utilities;

function Keys(props) {
  function generateKeys() {
    return Array.from(Array(notesInOctave * props.screenSize), (el, i) => (
      <Key key={i} value={Utilities.octaveMod(i)} index={i} {...props} />
    ));
  }

  return (
    <div className="mx-8 py-8 flex flex-row justify-center border-b border-gray-400">
      {generateKeys()}
    </div>
  );
}

export default Keys;
