import Utilities from './Utilities';
import Vex from 'vexflow';

class VexScale {
  static getVFNote(note, octave) {
    const vf = Vex.Flow;
    let vfNote = new vf.StaveNote({
      clef: 'treble',
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
        ? Utilities.noteNamesSharp[Utilities.octaveMod(el)]
        : Utilities.noteNamesFlat[Utilities.octaveMod(el)]
    );
  }

  static getBaseNotes7(pitchCenter, absolutePitches, keyHasSharps) {
    const firstNote = keyHasSharps
      ? Utilities.noteNamesSharp[pitchCenter]
      : Utilities.noteNamesFlat[pitchCenter];
    const indexFirst = Utilities.alphaLetters.indexOf(firstNote[0]);
    const alphaScale = Utilities.alphaLetters
      .slice(indexFirst)
      .concat(Utilities.alphaLetters.slice(0, indexFirst));

    return absolutePitches.map(
      (el) => Utilities.enharmonics[Utilities.octaveMod(el)][alphaScale.shift()]
    );
  }

  static getVexScale(pitchCenter, modeCode, absolutePitches) {
    const keyHasSharps = Utilities.keyHasSharps(pitchCenter, modeCode);
    const scaleHasSevenNotes = absolutePitches.length === 7;

    const baseNotes = scaleHasSevenNotes
      ? this.getBaseNotes7(pitchCenter, absolutePitches, keyHasSharps)
      : this.getBaseNotes68(absolutePitches, keyHasSharps);

    let octave = 4;

    return baseNotes.map((el) => {
      const note = this.getVFNote(el, octave);
      el[0] === 'B' && octave++;
      return note;
    });
  }
}

export default VexScale;
