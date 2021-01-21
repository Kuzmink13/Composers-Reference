/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import useToggle from './useToggle';

const initialState = {
  isSelectionFiltered: false,
};

const storageKey = 'selectionFilter';

function useSelectionFilter() {
  return useToggle(initialState.isSelectionFiltered, storageKey);
}

export default useSelectionFilter;
