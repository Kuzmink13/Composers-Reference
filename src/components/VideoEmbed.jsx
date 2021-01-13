import React from 'react';

function VideoEmbed({ classAddOn, src }) {
  return (
    <video
      autoPlay
      loop
      className={`${classAddOn} mx-auto border border-gray-400 rounded-md`}
    >
      <source {...{ src }} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoEmbed;
