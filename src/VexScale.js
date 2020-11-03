import Utilities from './Utilities';
import Vex from 'vexflow';

const { noteNamesSharp, noteNamesFlat, alphaLetters, enharmonics } = Utilities;

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

  static getBaseNotes68(absolutePitches, keyHasSharps) {
    return absolutePitches.map((el) =>
      keyHasSharps
        ? noteNamesSharp[Utilities.octaveMod(el)]
        : noteNamesFlat[Utilities.octaveMod(el)]
    );
  }

  static getBaseNotes7(pitchCenter, absolutePitches, keyHasSharps) {
    const firstNote = keyHasSharps
      ? noteNamesSharp[pitchCenter]
      : noteNamesFlat[pitchCenter];
    const indexFirst = alphaLetters.indexOf(firstNote[0]);
    const alphaScale = alphaLetters
      .slice(indexFirst)
      .concat(alphaLetters.slice(0, indexFirst));

    return absolutePitches.map(
      (el) => enharmonics[Utilities.octaveMod(el)][alphaScale.shift()]
    );
  }

  static getVexScale(pitchCenter, modeCode, absolutePitches, clef) {
    const keyHasSharps = Utilities.keyHasSharps(pitchCenter, modeCode);
    const scaleHasSevenNotes = absolutePitches.length === 7;

    const baseNotes = scaleHasSevenNotes
      ? this.getBaseNotes7(pitchCenter, absolutePitches, keyHasSharps)
      : this.getBaseNotes68(absolutePitches, keyHasSharps);

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

    return baseNotes.map((el) => {
      const note = this.getVFNote(el, octave, clef);
      el[0] === 'B' && octave++;
      return note;
    });
  }

  static generateStaff(
    elementID,
    pitchCenter,
    modeCode,
    absolutePitches,
    clef
  ) {
    const vf = Vex.Flow;

    let div = document.getElementById(elementID);
    let renderer = new vf.Renderer(div, vf.Renderer.Backends.SVG);

    renderer.resize(280, 85);

    let context = renderer.getContext();

    let stave = new vf.Stave(0, -15, 280);

    stave.addClef(clef);

    let notes = this.getVexScale(pitchCenter, modeCode, absolutePitches, clef);

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
