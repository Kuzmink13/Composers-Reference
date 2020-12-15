import { useState, useEffect } from 'react';

import { getItem, setItem } from '../logic/Storage';

export const supportedClefs = { treble: 'treble', alto: 'alto', bass: 'bass' };

const initialState = {
  clef: supportedClefs.treble,
};

const storageKey = 'clef';

function useClef() {
  const [clef, setClef] = useState(getItem(storageKey) || initialState.clef);

  function handleClefChange(newClef) {
    setClef(newClef);
  }

  function resetClef() {
    setClef(initialState.clef);
  }

  useEffect(() => {
    setItem(storageKey, `"${clef}"`);
  }, [clef]);

  return [clef, handleClefChange, resetClef];
}

export default useClef;
