import React, { Component } from 'react';

class ModeList extends Component {
  render() {
    return (
      <div className="flex-1 text-center">
        {this.props.filteredList.length
          ? this.props.filteredList.map((el, i) => (
              <div key={i}>{el.getAbsoluteModeCode()}</div>
            ))
          : 'no modes available'}
      </div>
    );
  }
}

export default ModeList;
