import React, { Component } from 'react';
import ModeButton from './ModeButton';

class ButtonPanel extends Component {
  render() {
    let buttons = ['SIX', 'SEVEN', 'EIGHT'];
    return (
      <div className="flex flex-row justify-center">
        {buttons.map((scaleListString, i) => (
          <ModeButton
            key={i}
            scaleList={i}
            scaleListString={scaleListString}
            selectedScaleList={this.props.selectedScaleList}
            listSize={this.props.filteredLists[i].length}
            handleSelectorChange={this.props.handleSelectorChange}
          />
        ))}
      </div>
    );
  }
}

export default ButtonPanel;
