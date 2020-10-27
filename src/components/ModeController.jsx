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
    const selectedList = this.props.filteredLists[this.state.selectedScaleList];
    return (
      <Fragment>
        <ButtonPanel
          filteredLists={this.props.filteredLists}
          selectedScaleList={this.state.selectedScaleList}
          handleSelectorChange={this.handleSelectorChange}
        />
        {selectedList.length ? (
          <ModePanel
            key={selectedList.toString()}
            filteredList={selectedList}
          />
        ) : (
          <div className="m-auto">no modes available</div>
        )}
      </Fragment>
    );
  }
}

export default ModeController;
