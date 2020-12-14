import useToggle from '../hooks/useToggle';

const initialState = {
  areKeysShown: false,
  areNoteNamesShown: false,
};

const storageKeys = {
  keys: 'keys',
  noteNames: 'noteNames',
};

function useOverlay() {
  const [areKeysShown, toggleKeys, resetKeys] = useToggle(
    initialState.areKeysShown,
    storageKeys.keys
  );

  const [areNoteNamesShown, toggleNoteNames, resetNoteNames] = useToggle(
    initialState.areNoteNamesShown,
    storageKeys.noteNames
  );

  const resetOverlay = () => {
    resetKeys();
    resetNoteNames();
  };

  return [
    { areKeysShown, areNoteNamesShown },
    toggleKeys,
    toggleNoteNames,
    resetOverlay,
  ];
}

export default useOverlay;
