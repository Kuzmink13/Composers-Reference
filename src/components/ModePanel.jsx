import React, { Component } from 'react';
import ModeBlock from './ModeBlock';

class ModePanel extends Component {
  render() {
    const isListEmpty = !this.props.filteredList.length;

    return (
      <div className="mx-8 h-full overflow-y-auto scrolling-auto flex justify-center items-start flex-wrap">
        {isListEmpty ? (
          <div className="m-8">no modes available</div>
        ) : (
          this.props.filteredList.map((mode, i) => (
            <ModeBlock key={i} modeName={mode.getModeName()} />
          ))
        )}
      </div>
    );
  }
}

export default ModePanel;
