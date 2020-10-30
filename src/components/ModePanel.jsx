import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ModeBlock from './ModeBlock';

function ModePanel(props) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let scrollParentRef;

  function loadMore() {
    const cardsToLoad = 6;
    const numLoaded = items.length;
    const listLen = props.selectedList.length;
    const nextIncrement = Math.min(listLen, numLoaded + cardsToLoad);

    setItems(
      items.concat(
        props.selectedList
          .slice(numLoaded, nextIncrement)
          .map((mode) => generateModeBlock(mode))
      )
    );
    setHasMore(listLen > numLoaded);
  }

  function generateModeBlock(mode) {
    return (
      <ModeBlock
        key={mode.getAbsoluteModeCode()}
        pitchCenter={mode.getPitchCenter()}
        absolutePitches={mode.getAbsolutePitches()}
        modeCode={mode.getAbstractModeCode()}
        modeName={mode.getModeName()}
      />
    );
  }

  return (
    <div
      className="h-full overflow-y-auto scrolling-auto"
      ref={(ref) => (scrollParentRef = ref)}
    >
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={false}
        getScrollParent={scrollParentRef}
      >
        <div className="flex justify-center items-start flex-wrap">{items}</div>
      </InfiniteScroll>
    </div>
  );
}

export default ModePanel;
