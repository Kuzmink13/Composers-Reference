import React, { useState, Fragment, useEffect } from 'react';

import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

function ModeController(props) {
  // SELECTED MODE LIST CONTROL
  const [selectedListIndex, setSelectedListIndex] = useState(1);
  const [selectedList, setSelectedList] = useState([]);

  function handleSelectorChange(newSelector) {
    setSelectedListIndex(newSelector);
  }

  useEffect(() => {
    setSelectedList(props.filteredLists[selectedListIndex]);
  }, [props.filteredLists, selectedListIndex]);

  // RENDER
  const buttonPanelProps = {
    filteredLists: props.filteredLists,
    modeButtonProps: {
      selectedListIndex,
      handleSelectorChange,
    },
  };

  return (
    <Fragment>
      <ButtonPanel {...buttonPanelProps} />
      {selectedList.length ? (
        <ModePanel selectedList={selectedList} {...props.modePanelProps} />
      ) : (
        <span className="text-gray-500 text-sm font-semibold tracking-wider m-auto mt-12">
          no results to display for the current selection
        </span>
      )}
    </Fragment>
  );
}

export default ModeController;
