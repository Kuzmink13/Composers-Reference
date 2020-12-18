import React, { useState, Fragment, useEffect } from 'react';

import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

import { ModeButtonProvider } from '../contexts/ModeButtonContext';

function ModeController({ modeLists }) {
  // SELECTED MODE LIST CONTROL
  const [selectedListIndex, setSelectedListIndex] = useState(1);
  const [selectedList, setSelectedList] = useState([]);

  function handleSelectorChange(newSelector) {
    setSelectedListIndex(newSelector);
  }

  useEffect(() => {
    setSelectedList(modeLists[selectedListIndex]);
  }, [modeLists, selectedListIndex]);

  // RENDER
  return (
    <Fragment>
      <ModeButtonProvider
        modeButtonProps={{
          selectedListIndex,
          handleSelectorChange,
        }}
      >
        <ButtonPanel {...{ modeLists }} />
      </ModeButtonProvider>

      {selectedList.length ? (
        <ModePanel selectedList={selectedList} />
      ) : (
        <span className="text-gray-500 text-sm font-semibold tracking-wider m-auto mt-12 px-4 text-center">
          no results to display for the current selection
        </span>
      )}
    </Fragment>
  );
}

export default ModeController;
