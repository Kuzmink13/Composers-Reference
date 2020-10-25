import React, { Component } from 'react';
import ModeBlock from './ModeBlock';
import Vex from 'vexflow';

class ModePanel extends Component {
  constructor() {
    super();
    this.state = {
      vf: Vex.Flow,
    };
  }
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
                modeName={mode.getModeName()}
                vf={this.state.vf}
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
