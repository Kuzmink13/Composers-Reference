/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import ModeBlock from '../components/ModeBlock';

import {
  getCardinality,
  getNotesState,
  getSelectionFilterState,
  getTonalityState,
} from '../redux/selectors';

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

  const notes = useSelector(getNotesState, isEqual);
  const selection = useSelector(getSelectionFilterState, isEqual);
  const tonalities = useSelector(getTonalityState, isEqual);
  const cardinality = useSelector(getCardinality, isEqual);

  useEffect(() => {
    clearState();
  }, [notes, selection, tonalities, cardinality]);

  return [{ items, hasMore }, loadMore];
}

export default useModePanel;
