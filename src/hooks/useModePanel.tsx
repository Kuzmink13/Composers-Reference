/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

import ModeBlock from '../components/ModeBlock';

const initialState = {
  items: () => [],
};

const itemsToLoad = 6;

function useModePanel(selectedList) {
  const [itemsLoaded, setItemsLoaded] = useState(initialState.items().length);
  const listLength = selectedList.length;
  const hasMore = listLength > itemsLoaded;

  const loadMore = useCallback(() => {
    setItemsLoaded((currentLength) =>
      Math.min(listLength, currentLength + itemsToLoad)
    );
  }, [listLength]);

  const clearState = () => {
    setItemsLoaded(initialState.items().length);
  };

  const generateModeBlock = (mode) => {
    return <ModeBlock key={mode.getAbsoluteModeCode()} mode={mode} />;
  };

  const items = useMemo(
    () => selectedList.slice(0, itemsLoaded).map(generateModeBlock),
    [selectedList, itemsLoaded]
  );

  useEffect(() => {
    clearState();
  }, [selectedList]);

  return [{ items, hasMore }, loadMore];
}

export default useModePanel;
