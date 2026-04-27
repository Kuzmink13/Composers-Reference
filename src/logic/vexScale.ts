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

export function formatVoice(voice: Voice, stave: Stave): void {
  new Formatter().joinVoices([voice]).formatToStave([voice], stave);
}

export function getContext(elementID: string) {
  return new Renderer(elementID, Renderer.Backends.SVG)
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

export function getVoice(length: number): Voice {
  return new Voice({
    numBeats: length,
    beatValue: 1,
  }).setStrict(false);
}

export function getVFNote(note: string, octave: number, clef: string): StaveNote {
  const accidentalValue = note.slice(1);
  const vfNote = new StaveNote({
    clef: clef,
    keys: [`${note}/${octave}`],
    duration: 'w',
  });

  accidentalValue && vfNote.addModifier(new Accidental(accidentalValue), 0);

  return vfNote;
}
