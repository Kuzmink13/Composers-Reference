import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ModeBlock from './ModeBlock';

class ModePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hasMore: true,
    };
  }

  loadMore() {
    this.setState((state, props) => {
      const cardsToLoad = 6;
      const numLoaded = state.items.length;
      const listLen = props.filteredList.length;
      const nextIncrement = Math.min(listLen, numLoaded + cardsToLoad);

      return {
        items: state.items.concat(
          props.filteredList
            .slice(numLoaded, nextIncrement)
            .map((mode) => this.generateModeBlock(mode))
        ),
        hasMore: listLen > numLoaded,
      };
    });
  }

  generateModeBlock(mode) {
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

  render() {
    return (
      <div
        className="h-full overflow-y-auto scrolling-auto"
        ref={(ref) => (this.scrollParentRef = ref)}
      >
        <InfiniteScroll
          loadMore={this.loadMore.bind(this)}
          hasMore={this.state.hasMore}
          useWindow={false}
          getScrollParent={() => this.scrollParentRef}
        >
          <div className="flex justify-center items-start flex-wrap">
            {this.state.items}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default ModePanel;
