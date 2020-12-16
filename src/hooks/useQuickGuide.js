import useToggle from './useToggle';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';

const initialState = {
  isGuideDismissed: false,
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

  return [
    { isGuideDismissed, isGuideShown },
    toggleDismissGuide,
    toggleShowGuide,
    resetGuide,
  ];
}

export default useQuickGuide;
