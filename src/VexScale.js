import Utilities from './Utilities';
import Vex from 'vexflow';

class VexScale {
  static getVFNote(note, octave, clef) {
    const vf = Vex.Flow;
    let vfNote = new vf.StaveNote({
      clef: clef,
      keys: [`${note}/${octave}`],
      duration: 'w',
    });

    return note.length > 1
      ? vfNote.addAccidental(0, new vf.Accidental(note.slice(1)))
      : vfNote;
  }

  static getVexScale(pitchCenter, absolutePitches, clef) {
    const baseNotes = Utilities.getBaseNotes(pitchCenter, absolutePitches);

    const getTransposition = () => {
      switch (clef) {
        case 'treble':
          return 4;
        case 'alto':
          return baseNotes[0][0] === 'C' ? 4 : 3;
        default:
          return baseNotes[0][0] === 'C' || baseNotes[0][0] === 'D' ? 3 : 2;
      }
    };

    let octave = getTransposition();
    let hasJumpedOctave = false;

    return baseNotes.map((el) => {
      const isB = el[0] === 'B';
      let note;

      if (isB && hasJumpedOctave) {
        note = this.getVFNote(el, octave - 1, clef);
      } else {
        note = this.getVFNote(el, octave, clef);
      }

      if (isB && !hasJumpedOctave) {
        hasJumpedOctave = true;
        octave++;
      }
      return note;
    });
  }

  static generateStaff(elementID, pitchCenter, absolutePitches, clef) {
    const vf = Vex.Flow;

    let div = document.getElementById(elementID);
    let renderer = new vf.Renderer(div, vf.Renderer.Backends.SVG);

    renderer.resize(280, 85);

    let context = renderer.getContext();

    let stave = new vf.Stave(0, -15, 280);

    stave.addClef(clef);

    let notes = this.getVexScale(pitchCenter, absolutePitches, clef);

    let voice = new vf.Voice({
      num_beats: notes.length,
      beat_value: 1,
    });

    voice.addTickables(notes);

    let formatter = new vf.Formatter();
    formatter.format([voice], 260);

    stave.setContext(context).draw();
    voice.draw(context, stave);
  }
}

export default VexScale;
