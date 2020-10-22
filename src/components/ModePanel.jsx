import React, { Component } from 'react';
import Utilities from '../Utilities';
import ModeList from './ModeList';

class ModePanel extends Component {
  getModeList(noteQuan) {
    return (
      <ModeList
        key={noteQuan}
        modeList={this.props.modeList.filter(
          (el) => el.getNoteQuantity() === noteQuan
        )}
      />
    );
  }

  render() {
    return (
      <div className="flex-grow flex px-6">
        {this.props.modeList.length ? (
          this.props.isWide ? (
            Utilities.supportedScaleLengths.map((el) => this.getModeList(el))
          ) : (
            this.getModeList(this.props.tonalitySelector)
          )
        ) : (
          <div className="flex-1 text-center">no scales available</div>
        )}
      </div>
    );
  }
}

export default ModePanel;
