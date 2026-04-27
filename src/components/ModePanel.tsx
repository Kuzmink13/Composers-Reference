/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useStore } from '../zustand/hooks';
import * as filters from '../logic/filters';

import useModePanel from '../hooks/useModePanel';

const scrollLoadThresholdPx = 96;

function ModePanel() {
  const notesState = useStore((state) => state.notes);
  const cardinality = useStore((state) => state.cardinality);
  const selectionFilter = useStore((state) => state.selectionFilter);
  const tonalities = useStore((state) => state.tonalities);

  const selectedList = useMemo(
    () =>
      notesState.modeList
        .filter(filters.byRoot(notesState.root))
        .filter(filters.byCardinality(cardinality))
        .filter(filters.bySelection(notesState.notes, selectionFilter))
        .filter(filters.byTonality(tonalities)),
    [notesState, cardinality, selectionFilter, tonalities]
  );

  const [{ items, hasMore }, loadMore] = useModePanel(selectedList);
  const scrollParentRef = useRef<HTMLDivElement | null>(null);

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
