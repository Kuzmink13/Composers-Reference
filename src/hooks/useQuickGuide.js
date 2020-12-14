import useToggle from './useToggle';

const initialState = {
  isGuideDismissed: false,
};

const storagekey = 'isGuideDismissed';

function useQuickGuide() {
  const [isGuideDismissed, toggleDismissGuide, resetGuide] = useToggle(
    initialState.isGuideDismissed,
    storagekey
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
