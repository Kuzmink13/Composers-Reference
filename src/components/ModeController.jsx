import React, { useState, Fragment } from 'react';
import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

function ModeController(props) {
  const [selectedScaleList, setSelectedScaleList] = useState(1);
  const selectedList = props.filteredLists[selectedScaleList];

  function handleSelectorChange(newSelector) {
    setSelectedScaleList(newSelector);
  }

  return (
    <Fragment>
      <ButtonPanel
        filteredLists={props.filteredLists}
        selectedScaleList={selectedScaleList}
        handleSelectorChange={handleSelectorChange}
      />
      {selectedList.length ? (
        <ModePanel
          key={`${props.appCode}(${selectedScaleList})`}
          selectedList={selectedList}
        />
      ) : (
        <div className="m-auto">no modes available</div>
      )}
    </Fragment>
  );
}

export default ModeController;
