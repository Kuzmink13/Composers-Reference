/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

import ModeBlock from '../components/ModeBlock';
import type Mode from '../objects/Mode';

const itemsToLoad = 6;

interface ModePanelPage {
  items: React.ReactElement[];
  hasMore: boolean;
}

function useModePanel(selectedList: Mode[]): [ModePanelPage, () => void] {
  const [itemsLoaded, setItemsLoaded] = useState(0);
  const listLength = selectedList.length;
  const hasMore = listLength > itemsLoaded;

  const loadMore = useCallback(() => {
    setItemsLoaded((currentLength) =>
      Math.min(listLength, currentLength + itemsToLoad)
    );
  }, [listLength]);

  const generateModeBlock = (mode: Mode): React.ReactElement => {
    return <ModeBlock key={mode.getAbsoluteModeCode()} mode={mode} />;
  };

  const items = useMemo(
    () => selectedList.slice(0, itemsLoaded).map(generateModeBlock),
    [selectedList, itemsLoaded]
  );

  useEffect(() => {
    setItemsLoaded(Math.min(itemsToLoad, listLength));
  }, [selectedList, listLength]);

  return [{ items, hasMore }, loadMore];
}

export default useModePanel;
