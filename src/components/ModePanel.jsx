import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import useModePanel from '../hooks/useModePanel';

import { useModeContext } from '../contexts/ModeContext';

function ModePanel({ selectedList }) {
  const { clef } = useModeContext();

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
