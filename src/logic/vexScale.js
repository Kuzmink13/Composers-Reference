import Vex from 'vexflow';

const vf = Vex.Flow;

const format = {
  canvasWidth: 280,
  canvasHeight: 85,
  xPosition: 0,
  yPosition: -15,
};

export const formatter = new vf.Formatter();

export function getContext(elementID) {
  return new vf.Renderer(
    document.getElementById(elementID),
    vf.Renderer.Backends.SVG
  )
    .resize(format.canvasWidth, format.canvasHeight)
    .getContext();
}

export function getStave() {
  return new vf.Stave(format.xPosition, format.yPosition, format.canvasWidth);
}

export function getVoice(length) {
  return new vf.Voice({
    num_beats: length,
    beat_value: 1,
  });
}

export function getVFNote(note, octave, clef) {
  const accidentalValue = note.slice(1);
  const vfNote = new vf.StaveNote({
    clef: clef,
    keys: [`${note}/${octave}`],
    duration: 'w',
  });

  accidentalValue &&
    vfNote.addAccidental(0, new vf.Accidental(accidentalValue));

  return vfNote;
}
