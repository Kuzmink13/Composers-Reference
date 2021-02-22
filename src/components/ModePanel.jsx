/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import useModePanel from '../hooks/useModePanel';

import { getFilteredModeList } from '../redux/selectors';

function ModePanel() {
  const selectedList = useSelector(getFilteredModeList);

  const [{ items, hasMore }, loadMore] = useModePanel(selectedList);

  let scrollParentRef;
  return selectedList.length ? (
    <div
      className="h-full overflow-y-auto pb-1 overscroll-y-auto"
      ref={(ref) => (scrollParentRef = ref)}
    >
      <InfiniteScroll
        className="flex justify-center items-start flex-wrap"
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={false}
        getScrollParent={scrollParentRef}
      >
        {items}
      </InfiniteScroll>
    </div>
  ) : (
    <span className="text-gray-700 text-sm font-semibold tracking-wider m-auto mt-12 px-4 text-center">
      no results to display for the current selection
    </span>
  );
}

export default ModePanel;
