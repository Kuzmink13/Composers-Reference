import useToggle from './useToggle';

const initialState = {
  isSelectionFiltered: false,
};

const storageKey = 'selectionFilter';

function useSelectionFilter() {
  return useToggle(initialState.isSelectionFiltered, storageKey);
}

export default useSelectionFilter;
