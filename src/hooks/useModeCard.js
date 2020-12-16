import { useState } from 'react';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

const initialState = {
  isModeCardShown: false,
  showAnimation: true,
  modeProps: undefined,
};

function useModeCard() {
  const [isModeCardShown, setIsModeCardShown] = useState(
    initialState.isModeCardShown
  );
  const [showAnimation, setShowAnimation] = useState(
    initialState.showAnimation
  );
  const [modeProps, setModeProps] = useState(initialState.modeProps);

  const openModeCard = (modeProps, showAnimation = true) => {
    setIsModeCardShown(true);
    setShowAnimation(showAnimation);
    setModeProps(modeProps);
  };

  const closeModeCard = () => {
    setIsModeCardShown(initialState.isModeCardShown);
    setShowAnimation(initialState.showAnimation);
    setModeProps(initialState.modeProps);
  };

  useKeyboardFn(closeModeCard, keyArrays.escape);

  return [
    { isModeCardShown, showAnimation, modeProps },
    openModeCard,
    closeModeCard,
  ];
}

export default useModeCard;
