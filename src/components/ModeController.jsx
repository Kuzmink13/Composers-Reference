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
        <span className="m-auto">no modes available</span>
      )}
    </Fragment>
  );
}

export default ModeController;
