/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useState, useMemo } from 'react';

const initialState = {
  selectedListIndex: 1,
};

function useModeSelector(modeLists) {
  const [selectedListIndex, setSelectedListIndex] = useState(
    initialState.selectedListIndex
  );

  const handleSelectorChange = (newSelector) => {
    setSelectedListIndex(newSelector);
  };

  const selectedList = useMemo(() => modeLists[selectedListIndex], [
    selectedListIndex,
    modeLists,
  ]);

  return [{ selectedListIndex, selectedList }, handleSelectorChange];
}

export default useModeSelector;
