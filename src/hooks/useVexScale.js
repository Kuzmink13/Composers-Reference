import { useEffect } from 'react';
import Vex from 'vexflow';

const vf = Vex.Flow;
const formatter = new vf.Formatter();
const format = {
  canvasWidth: 280,
  canvasHeight: 85,
  xPosition: 0,
  yPosition: -15,
  reducedWidth: 260,
};

function getContext(elementID) {
  return new vf.Renderer(
    document.getElementById(elementID),
    vf.Renderer.Backends.SVG
  )
    .resize(format.canvasWidth, format.canvasHeight)
    .getContext();
}

function getStave() {
  return new vf.Stave(format.xPosition, format.yPosition, format.canvasWidth);
}

function getVoice(length) {
  return new vf.Voice({
    num_beats: length,
    beat_value: 1,
  });
}

function getVFNote(note, octave, clef) {
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

function toVexScale(clef) {
  return (note) => getVFNote(note, 4, clef);
}

function generateStaff(mode, clef) {
  const context = getContext(mode.getModeName());
  const stave = getStave().addClef(clef);
  const notes = mode.getBaseNotes().map(toVexScale(clef));
  const voice = getVoice(notes.length).addTickables(notes);

  formatter.format([voice], format.reducedWidth);
  stave.setContext(context).draw();
  voice.draw(context, stave);
}

function useVexScale(mode, clef) {
  useEffect(() => {
    generateStaff(mode, clef);
    return () => {
      document.getElementById(mode.getModeName()).innerHTML = '';
    };
  });
}

export default useVexScale;
