import React from 'react';
import VexStaff from './VexStaff';

function ModeBlock(props) {
  return (
    <button
      onClick={() => props.getCard(props)}
      className="tab-selection m-1 p-1"
    >
      <div
        className="p-2 bg-white border border-gray-400 rounded-lg
                    text-center tracking-wider font-medium
                    hover:shadow-md"
      >
        {props.modeName}
        <VexStaff {...props} />
      </div>
    </button>
  );
}

export default ModeBlock;
