import React, { Component } from 'react';
import ModeBlock from './ModeBlock';

class ModePanel extends Component {
  render() {
    const isListEmpty = !this.props.filteredList.length;

    return (
      <div className="h-full overflow-y-auto scrolling-auto flex justify-center items-start flex-wrap">
        {this.props.hasEnoughNotes ? (
          isListEmpty ? (
            <div className="my-8">no modes available</div>
          ) : (
            this.props.filteredList.map((mode, i) => (
              <ModeBlock
                key={i}
                pitchCenter={mode.getPitchCenter()}
                absolutePitches={mode.getAbsolutePitches()}
                modeCode={mode.getAbstractModeCode()}
                modeName={mode.getModeName()}
              />
            ))
          )
        ) : (
          <div className="my-8">select at least two notes</div>
        )}
      </div>
    );
  }
}

export default ModePanel;
