/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useState, useEffect } from 'react';

import ModeBlock from '../components/ModeBlock';

const initialState = {
  items: () => [],
};

const itemsToLoad = 6;

function useModePanel(selectedList) {
  const [items, setItems] = useState(initialState.items());
  const itemsLoaded = items.length;
  const listLength = selectedList.length;
  const hasMore = listLength > itemsLoaded;

  const loadMore = () => {
    setItems(
      items.concat(
        selectedList
          .slice(itemsLoaded, Math.min(listLength, itemsLoaded + itemsToLoad))
          .map((mode) => generateModeBlock(mode))
      )
    );
  };

  const clearState = () => {
    setItems(initialState.items());
  };

  const generateModeBlock = (mode) => {
    return <ModeBlock key={mode.getAbsoluteModeCode()} mode={mode} />;
  };

  useEffect(() => {
    clearState();
  }, [selectedList]);

  return [{ items, hasMore }, loadMore];
}

export default useModePanel;
