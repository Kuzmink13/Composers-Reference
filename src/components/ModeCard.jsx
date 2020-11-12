import React from 'react';
import VexStaff from './VexStaff';
import Chords from '../Chords';

function ModeCard(props) {
  const keyPrefix = props.modeName.split(' ')[0];
  const modeChords = Chords.treeCrawler(props.abstractPitches);

  return (
    <div className="relative flex flex-col py-8 items-center w-full max-w-md m-auto border border-gray-400 bg-white rounded-lg shadow-xl">
      {props.modeName}
      <VexStaff {...props} />
      {Array.from(modeChords, (el) => (
        <div key={el}>{`${keyPrefix}${el}`.trim()}</div>
      ))}
    </div>
  );
}

export default ModeCard;
