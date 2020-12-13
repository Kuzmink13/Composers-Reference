import { useState } from 'react';

import { keys, getItem, setItem, removeItem } from '../logic/Storage';

const initialState = {
  areKeysShown: false,
  areNoteNamesShown: false,
};

const storageKeys = {
  ...keys.overlay,
};

function useOverlay() {
  const [areKeysShown, setAreKeysShown] = useState(
    getItem(storageKeys.keys) || initialState.areKeysShown
  );
  const [areNoteNamesShown, setAreNoteNamesShown] = useState(
    getItem(storageKeys.noteNames) || initialState.areNoteNamesShown
  );

  const toggleKeys = () => {
    setAreKeysShown(!areKeysShown);
    setItem(storageKeys.keys, !areKeysShown);
  };

  const toggleNoteNames = () => {
    setAreNoteNamesShown(!areNoteNamesShown);
    setItem(storageKeys.noteNames, !areNoteNamesShown);
  };

  const resetOverlay = () => {
    setAreKeysShown(initialState.areKeysShown);
    setAreNoteNamesShown(initialState.areNoteNamesShown);
    removeItem(storageKeys.keys);
    removeItem(storageKeys.noteNames);
  };

  return [
    { areKeysShown, areNoteNamesShown },
    toggleKeys,
    toggleNoteNames,
    resetOverlay,
  ];
}

export default useOverlay;
