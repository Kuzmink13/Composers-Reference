import { useState } from 'react';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

const initialState = {
  isModeCardShown: false,
  modeProps: undefined,
};

function useModeCard() {
  const [isModeCardShown, setIsModeCardShown] = useState(
    initialState.isModeCardShown
  );
  const [modeProps, setModeProps] = useState(initialState.modeProps);

  const openModeCard = (modeProps, showAnimation = true) => {
    setIsModeCardShown(true);
    setModeProps(modeProps);
  };

  const closeModeCard = () => {
    setIsModeCardShown(initialState.isModeCardShown);
    setModeProps(initialState.modeProps);
  };

  useKeyboardFn(closeModeCard, keyArrays.escape);

  return [{ isModeCardShown, modeProps }, openModeCard, closeModeCard];
}

export default useModeCard;
