import React from 'react';
import VexStaff from './VexStaff';

function ModeBlock(props) {
  return (
    <div
      onClick={() => props.getCard(props)}
      className="m-2 p-2 bg-white border border-gray-400 rounded-lg text-center tracking-wide font-medium"
    >
      {props.modeName}
      <VexStaff {...props} />
    </div>
  );
}

export default ModeBlock;
