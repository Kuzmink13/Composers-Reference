import React, { Component } from 'react';
import ModeList from './ModeList';

class ModePanel extends Component {
  render() {
    return (
      <div className="flex-grow flex px-6">
        {this.props.filteredLists.reduce((acc, el) => acc + el.length, 0) ? (
          this.props.isWide ? (
            this.props.filteredLists.map((el, i) => (
              <ModeList key={i} filteredList={el} />
            ))
          ) : (
            <ModeList
              filteredList={
                this.props.filteredLists[this.props.tonalitySelector]
              }
            />
          )
        ) : (
          <div className="flex-1 text-center">no scales available</div>
        )}
      </div>
    );
  }
}

export default ModePanel;
