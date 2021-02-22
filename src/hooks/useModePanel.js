/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';

import ModeBlock from '../components/ModeBlock';

import {
  getCardinality,
  getNoteSelection,
  getNotesState,
  getTonalityState,
} from '../redux/selectors';

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

  const notes = useSelector(getNotesState, isEqual);
  const selection = useSelector(getNoteSelection, isEqual);
  const tonalities = useSelector(getTonalityState, isEqual);
  const cardinality = useSelector(getCardinality, isEqual);

  useEffect(() => {
    clearState();
  }, [notes, selection, tonalities, cardinality]);

  return [{ items, hasMore }, loadMore];
}

export default useModePanel;
