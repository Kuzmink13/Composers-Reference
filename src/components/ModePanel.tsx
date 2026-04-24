/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { useStore } from '../zustand/hooks';
import { isEqual } from 'lodash';
import * as filters from '../logic/filters';

import useModePanel from '../hooks/useModePanel';

const scrollLoadThresholdPx = 96;

function ModePanel() {
  const selectedList = useStore(
    (state) =>
      state.notes.modeList
        .filter(filters.byRoot(state.notes.root))
        .filter(filters.byCardinality(state.cardinality))
        .filter(
          filters.bySelection(state.notes.notes, state.selectionFilter)
        )
        .filter(filters.byTonality(state.tonalities)),
    isEqual
  );

  const [{ items, hasMore }, loadMore] = useModePanel(selectedList);
  const scrollParentRef = useRef(null);

  const handleScroll = useCallback(() => {
    const scrollParent = scrollParentRef.current;
    if (!scrollParent || !hasMore) return;

    const distanceToBottom =
      scrollParent.scrollHeight -
      (scrollParent.scrollTop + scrollParent.clientHeight);

    if (distanceToBottom <= scrollLoadThresholdPx) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    const scrollParent = scrollParentRef.current;
    if (!scrollParent || !hasMore) return;

    // Keep fetching pages until content can actually scroll (or list is exhausted).
    if (scrollParent.scrollHeight <= scrollParent.clientHeight) {
      loadMore();
    }
  }, [items.length, hasMore, loadMore]);

  useEffect(() => {
    const scrollParent = scrollParentRef.current;
    if (scrollParent && items.length === 0) {
      scrollParent.scrollTop = 0;
    }
  }, [items.length]);

  return selectedList.length ? (
    <div
      ref={scrollParentRef}
      className="h-full overflow-y-auto pb-1 overscroll-y-auto"
      onScroll={handleScroll}
    >
      <div className="flex justify-center items-start flex-wrap">{items}</div>
    </div>
  ) : (
    <span className="text-gray-700 text-sm font-semibold tracking-wider m-auto mt-12 px-4 text-center">
      no results to display for the current selection
    </span>
  );
}

export default ModePanel;
