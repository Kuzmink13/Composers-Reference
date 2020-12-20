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
