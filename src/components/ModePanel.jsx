import React, { Component } from 'react';
import ModeBlock from './ModeBlock';

class ModePanel extends Component {
  render() {
    const lists = this.props.filteredList.length ? (
      this.props.filteredList.map((el, i) => (
        <ModeBlock key={i} code={el.getAbsoluteModeCode()} />
      ))
    ) : (
      <div className="m-8">no modes available</div>
    );
    return (
      <div className="mx-8 h-full overflow-y-auto scrolling-auto flex justify-center items-start flex-wrap">
        {lists}
      </div>
    );
  }
}

export default ModePanel;
