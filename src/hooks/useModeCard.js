import { useState, useCallback, useEffect } from 'react';

import Keyboard from '../logic/Keyboard';

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

  const handleEscape = useCallback((event) => {
    Keyboard.isEscape(event.key) && closeModeCard();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);

  return [
    { isModeCardShown, showAnimation, modeProps },
    openModeCard,
    closeModeCard,
  ];
}

export default useModeCard;
