import React, { Component, Fragment } from 'react';
import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

class ModeController extends Component {
  filterByQuan(noteQuan) {
    return this.props.modeList.filter(
      (el) => el.getNoteQuantity() === noteQuan
    );
  }

  render() {
    let filteredLists = [
      this.filterByQuan(6),
      this.filterByQuan(7),
      this.filterByQuan(8),
    ];

    return (
      <Fragment>
        <ButtonPanel
          filteredLists={filteredLists}
          tonalitySelector={this.props.tonalitySelector}
          isWide={this.props.isWide}
          handleSelectorChange={this.props.handleSelectorChange}
        />
        <ModePanel
          filteredLists={filteredLists}
          tonalitySelector={this.props.tonalitySelector}
          isWide={this.props.isWide}
        />
      </Fragment>
    );
  }
}

export default ModeController;
