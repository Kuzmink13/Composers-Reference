import React, { useState, Fragment, useEffect } from 'react';

import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

function ModeController(props) {
  const [selectedListIndex, setSelectedListIndex] = useState(1);
  const [selectedList, setSelectedList] = useState([]);

  function handleSelectorChange(newSelector) {
    setSelectedListIndex(newSelector);
  }

  useEffect(() => {
    setSelectedList(props.filteredLists[selectedListIndex]);
  }, [props.filteredLists, selectedListIndex]);

  return (
    <Fragment>
      <ButtonPanel
        filteredLists={props.filteredLists}
        selectedListIndex={selectedListIndex}
        handleSelectorChange={handleSelectorChange}
      />
      {selectedList.length ? (
        <ModePanel
          selectedList={selectedList}
          clef={props.clef}
          getCard={props.getCard}
        />
      ) : (
        <span className="text-gray-500 text-sm font-medium tracking-wider m-auto mt-12">
          no results to display for the current selection
        </span>
      )}
    </Fragment>
  );
}

export default ModeController;
