import React, { Component } from 'react';

class ModeList extends Component {
  render() {
    return (
      <div className="flex-1 text-center">
        {this.props.modeList.length
          ? this.props.modeList.map((el) => (
              <div>{el.getAbsoluteModeCode()}</div>
            ))
          : 'no modes available'}
      </div>
    );
  }
}

export default ModeList;
