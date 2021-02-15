/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import useModePanel from '../hooks/useModePanel';

import { getClef } from '../redux/selectors';

function ModePanel({ selectedList }) {
  const clef = useSelector(getClef);

  const [{ items, hasMore }, loadMore] = useModePanel(selectedList, clef);

  let scrollParentRef;
  return (
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
  );
}

export default ModePanel;
