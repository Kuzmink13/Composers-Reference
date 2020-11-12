import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ModeBlock from './ModeBlock';
import ModeCard from './ModeCard';

function ModePanel(props) {
  // LOAD AND GENERATE MODE CARDS
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

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
        getCard={getCard}
        key={mode.getAbsoluteModeCode()}
        pitchCenter={mode.getPitchCenter()}
        absolutePitches={mode.getAbsolutePitches()}
        abstractPitches={mode.getAbstractPitches()}
        modeCode={mode.getAbstractModeCode()}
        modeName={mode.getModeName()}
        clef={props.clef}
      />
    );
  }

  // RESET PANEL ON SETTINGS CHANGE
  useEffect(() => {
    setItems([]);
    setHasMore(true);
  }, [props.selectedList, props.clef]);

  // MODE CARD CONTROLLER
  const [isModeCardShown, setIsModeCardShown] = useState(false);
  const [modeProps, setModeProps] = useState(undefined);

  function getCard(modeProps) {
    setIsModeCardShown(true);
    setModeProps(modeProps);
  }

  function closeCard() {
    setIsModeCardShown(false);
    setModeProps(undefined);
  }

  function handleEscape(event) {
    (event.key === 'Esc' || event.key === 'Escape') && closeCard();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  // RENDER
  let scrollParentRef;
  return (
    <div
      className="h-full overflow-y-auto scrolling-auto"
      ref={(ref) => (scrollParentRef = ref)}
    >
      {isModeCardShown && (
        <div
          className="fixed h-full w-full inset-0 z-30 flex bg-gray-400 bg-opacity-25"
          onClick={closeCard}
        >
          <ModeCard {...modeProps} />
        </div>
      )}
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
