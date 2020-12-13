import { useState } from 'react';

import { keys, getItem, setItem, removeItem } from '../logic/Storage';

export const supportedClefs = { treble: 'treble', alto: 'alto', bass: 'bass' };

const initialState = {
  clef: supportedClefs.treble,
};

const storagekey = keys.clef;

function useClef() {
  const [clef, setClef] = useState(getItem(storagekey) || initialState.clef);

  function handleClefChange(newClef) {
    setClef(newClef);
    setItem(storagekey, `"${newClef}"`);
  }

  function resetClef() {
    setClef(initialState.clef);
    removeItem(storagekey);
  }

  return [clef, handleClefChange, resetClef];
}

export default useClef;
