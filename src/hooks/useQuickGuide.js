import useToggle from './useToggle';

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

  return [
    { isGuideDismissed, isGuideShown },
    toggleDismissGuide,
    toggleShowGuide,
    resetGuide,
  ];
}

export default useQuickGuide;
