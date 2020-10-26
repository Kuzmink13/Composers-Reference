import React, { Component, Fragment } from 'react';
import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';

class ModeController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedScaleList: 1,
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  handleSelectorChange(scaleList) {
    this.setState({
      selectedScaleList: scaleList,
    });
  }

  render() {
    return (
      <Fragment>
        <ButtonPanel
          filteredLists={this.props.filteredLists}
          selectedScaleList={this.state.selectedScaleList}
          handleSelectorChange={this.handleSelectorChange}
        />
        <ModePanel
          hasEnoughNotes={this.props.hasEnoughNotes}
          filteredList={this.props.filteredLists[this.state.selectedScaleList]}
        />
      </Fragment>
    );
  }
}

export default ModeController;
