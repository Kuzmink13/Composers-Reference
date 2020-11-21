import React from 'react';
import VexStaff from './VexStaff';

function ModeBlock(props) {
  return (
    <button onClick={() => props.getCard(props)} className="mode-block">
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
