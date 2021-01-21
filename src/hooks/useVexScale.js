import { useEffect } from 'react';

import * as vs from '../logic/vexScale';
import { notesInOctave } from '../logic/utilities';

const formattedWidth = 260;

function getOctave(clef, firstNote) {
  const baseOctaves = {
    treble: 4,
    alto: 3,
    bass: 2,
  };

  const clefAdjustment = {
    treble: false,
    alto: firstNote[0] === 'C',
    bass: firstNote[0] === 'C' || firstNote[0] === 'D',
  };

  const isCflat = firstNote === 'Cb';

  return baseOctaves[clef] + clefAdjustment[clef] - isCflat;
}

/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

function toVexScale(mode, octave, clef) {
  const pitches = mode.getAbsolutePitches();
  const noteAdjustment = (note, i) =>
    (pitches[i] >= notesInOctave && note !== 'B#') || note === 'Cb';

  return (note, i) =>
    vs.getVFNote(note, octave + noteAdjustment(note, i), clef);
}

function generateStaff(mode, clef) {
  const context = vs.getContext(mode.getAbsoluteModeCode());
  const stave = vs.getStave().addClef(clef);
  const octave = getOctave(clef, mode.getModeRoot());
  const notes = mode.getScaleNotes().map(toVexScale(mode, octave, clef));
  const voice = vs.getVoice(notes.length).addTickables(notes);

  vs.formatter.format([voice], formattedWidth);
  stave.setContext(context).draw();
  voice.draw(context, stave);
}

function useVexScale(mode, clef) {
  useEffect(() => {
    generateStaff(mode, clef);
    return () => {
      document.getElementById(mode.getAbsoluteModeCode()).innerHTML = '';
    };
  });
}

export default useVexScale;
