/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';

function VideoEmbed({ classAddOn, width, src }) {
  return (
    <video
      autoPlay
      loop
      className={`${classAddOn} mx-auto border border-gray-400 rounded-md`}
      width={width}
      src={src}
    >
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoEmbed;
