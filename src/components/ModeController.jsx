import React, { Fragment } from 'react';

import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

import useModeSelector from '../hooks/useModeSelector';

import { ModeButtonProvider } from '../contexts/ModeButtonContext';

function ModeController({ modeLists }) {
  const [
    { selectedListIndex, selectedList },
    handleSelectorChange,
  ] = useModeSelector(modeLists);

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
