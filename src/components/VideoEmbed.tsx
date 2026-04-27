/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */


interface VideoEmbedProps {
  classAddOn: string;
  width: string;
  src: string;
}

function VideoEmbed({ classAddOn, width, src }: VideoEmbedProps) {
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
