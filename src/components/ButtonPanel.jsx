import React, { Component } from 'react';
import ModeButton from './ModeButton';

class ButtonPanel extends Component {
  state = {};
  render() {
    let buttons = ['SIX', 'SEVEN', 'EIGHT'];
    return (
      <div className="flex flex-row justify-center">
        {buttons.map((el, i) => (
          <ModeButton
            key={i}
            tonalityIndex={i}
            name={el}
            tonalitySelector={this.props.tonalitySelector}
            size={this.props.filteredLists[i].length}
            handleSelectorChange={this.props.handleSelectorChange}
          />
        ))}
      </div>
    );
  }
}

export default ButtonPanel;
