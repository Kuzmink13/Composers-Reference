import React from 'react';
import VexStaff from './VexStaff';

function ModeBlock(props) {
  return (
    <button
      onClick={() => props.getCard(props.modeProps)}
      className="tab-selection m-1 p-1"
    >
      <div className="box p-2 hover:shadow-md">
        <h2 className="text-center tracking-wider font-semibold">
          {props.modeProps.modeName}
        </h2>
        <VexStaff clef={props.clef} {...props.modeProps} />
      </div>
    </button>
  );
}

export default ModeBlock;
