/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useState } from 'react';
import useToggle from './useToggle';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { numPages } from '../components/GuideContent';

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
    guideIndex < numPages - 1 && setGuideIndex(guideIndex + 1);

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
