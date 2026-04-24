/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  Accidental,
  Formatter,
  Renderer,
  Stave,
  StaveNote,
  Voice,
} from 'vexflow';

const format = {
  canvasWidth: 280,
  canvasHeight: 85,
  xPosition: 1,
  yPosition: -15,
};

export function formatVoice(voice, stave) {
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
}

export function getContext(elementID) {
  return new Renderer(
    document.getElementById(elementID),
    Renderer.Backends.SVG
  )
    .resize(format.canvasWidth, format.canvasHeight)
    .getContext();
}

export function getStave() {
  return new Stave(
    format.xPosition,
    format.yPosition,
    format.canvasWidth - format.xPosition * 2
  );
}

export function getVoice(length) {
  return new Voice({
    num_beats: length,
    beat_value: 1,
  }).setStrict(false);
}

export function getVFNote(note, octave, clef) {
  const accidentalValue = note.slice(1);
  const vfNote = new StaveNote({
    clef: clef,
    keys: [`${note}/${octave}`],
    duration: 'w',
  });

  accidentalValue && vfNote.addModifier(new Accidental(accidentalValue), 0);

  return vfNote;
}
