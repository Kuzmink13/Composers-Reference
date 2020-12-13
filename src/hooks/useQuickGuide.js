import { useState } from 'react';

import { keys, getItem, setItem, removeItem } from '../logic/Storage';

const initialState = {
  isGuideDismissed: false,
};

const storagekey = keys.quickGuide.isGuideDismissed;

function useQuickGuide() {
  const [isGuideDismissed, setIsGuideDismissed] = useState(
    getItem(storagekey) || initialState.isGuideDismissed
  );
  const [isGuideShown, setIsGuideShown] = useState(!isGuideDismissed);

  function handleDismissGuide(setting = !isGuideDismissed) {
    setIsGuideDismissed(setting);
    setItem(storagekey, setting);
  }

  function toggleShowGuide() {
    setIsGuideShown(!isGuideShown);
  }

  function resetGuide() {
    setIsGuideDismissed(false);
    removeItem(storagekey);
  }

  return [
    { isGuideDismissed, isGuideShown },
    handleDismissGuide,
    toggleShowGuide,
    resetGuide,
  ];
}

export default useQuickGuide;
