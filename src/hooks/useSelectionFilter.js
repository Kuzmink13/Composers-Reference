import useToggle from './useToggle';

const initialState = {
  isSelectionFiltered: false,
};

const storagekey = 'selectionFilter';

function useSelectionFilter() {
  return useToggle(initialState.isSelectionFiltered, storagekey);
}

export default useSelectionFilter;
