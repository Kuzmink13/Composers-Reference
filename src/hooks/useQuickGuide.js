import { useState } from 'react';
import useToggle from './useToggle';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import guideContent from '../components/guideContent';

const initialState = {
  isGuideDismissed: false,
  guideIndex: 0,
};

const storageKey = 'isGuideDismissed';

function useQuickGuide() {
  const [isGuideDismissed, toggleDismissGuide, resetGuide] = useToggle(
    initialState.isGuideDismissed,
    storageKey
  );

  const [isGuideShown, toggleShowGuide] = useToggle(!isGuideDismissed);

  useKeyboardFn(
    () => toggleShowGuide(initialState.isGuideDismissed),
    keyArrays.escape
  );

  const [guideIndex, setGuideIndex] = useState(initialState.guideIndex);

  const incrementPage = () =>
    guideIndex < guideContent.length - 1 && setGuideIndex(guideIndex + 1);

  const decrementPage = () => guideIndex > 0 && setGuideIndex(guideIndex - 1);

  return [
    { isGuideDismissed, isGuideShown, guideIndex },
    { incrementPage, decrementPage },
    toggleDismissGuide,
    toggleShowGuide,
    resetGuide,
  ];
}

export default useQuickGuide;
