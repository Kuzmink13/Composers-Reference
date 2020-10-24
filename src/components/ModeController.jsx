import React, { Component, Fragment } from 'react';
import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

class ModeController extends Component {
  filterByQuan(noteQuan) {
    return this.props.modeList.filter(
      (Mode) => Mode.getNoteQuantity() === noteQuan
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
          selectedScaleList={this.props.selectedScaleList}
          handleSelectorChange={this.props.handleSelectorChange}
        />
        <ModePanel filteredList={filteredLists[this.props.selectedScaleList]} />
      </Fragment>
    );
  }
}

export default ModeController;
