import { useState } from 'react';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

const initialState = {
  isModeCardShown: false,
  mode: undefined,
};

function useModeCard() {
  const [isModeCardShown, setIsModeCardShown] = useState(
    initialState.isModeCardShown
  );
  const [mode, setMode] = useState(initialState.mode);

  const openModeCard = (mode) => {
    setIsModeCardShown(true);
    setMode(mode);
  };

  const closeModeCard = () => {
    setIsModeCardShown(initialState.isModeCardShown);
    setMode(initialState.mode);
  };

  useKeyboardFn(closeModeCard, keyArrays.escape);

  return [{ isModeCardShown, mode }, openModeCard, closeModeCard];
}

export default useModeCard;
