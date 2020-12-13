import { useState } from 'react';

import { keys, getItem, setItem, removeItem } from '../logic/Storage';

const initialState = {
  isSelectionFiltered: false,
};

const storagekey = keys.selectionFilter;

function useSelectionFilter() {
  const [isSelectionFiltered, setIsSelectionFiltered] = useState(
    getItem(storagekey) || initialState.isSelectionFiltered
  );

  function toggleSelectionFilter() {
    setIsSelectionFiltered(!isSelectionFiltered);
    setItem(storagekey, !isSelectionFiltered);
  }

  function resetSelectionFilter() {
    setIsSelectionFiltered(initialState.isSelectionFiltered);
    removeItem(storagekey);
  }

  return [isSelectionFiltered, toggleSelectionFilter, resetSelectionFilter];
}

export default useSelectionFilter;
