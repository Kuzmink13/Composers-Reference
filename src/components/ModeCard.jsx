import React from 'react';

function ModeCard(props) {
  return (
    <div className="relative flex flex-col py-8 items-center w-full max-w-md m-auto border border-gray-400 bg-white rounded-lg shadow-xl">
      {Array.from(props.modePitches, (el) => (
        <div key={el}>{el}</div>
      ))}
    </div>
  );
}

export default ModeCard;
