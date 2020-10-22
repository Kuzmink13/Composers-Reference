import React, { Component } from 'react';
import ModeButton from './ModeButton';

class ButtonPanel extends Component {
  state = {};
  render() {
    let buttons = ['SIX', 'SEVEN', 'EIGHT'];
    return (
      <div className="flex flex-row px-6 font-semibold tracking-wider text-center">
        {buttons.map((el, i) => (
          <ModeButton
            key={i}
            name={el}
            tonalitySelector={this.props.tonalitySelector}
            size={this.props.filteredLists[i].length}
          />
        ))}
      </div>
    );
  }
}

export default ButtonPanel;
