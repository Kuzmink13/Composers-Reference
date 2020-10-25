import Utilities from './Utilities';

class VexScale {
  static noteNamesSharp = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  static noteNamesFlat = [
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'Bb',
    'B',
  ];

  static alphaLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  static getBaseNotes(pitchCenter, modeCode, absolutePitches) {
    const keyHasSharps = Utilities.keyHasSharps(pitchCenter, modeCode);
    const firstNote = keyHasSharps
      ? this.noteNamesSharp[pitchCenter]
      : this.noteNamesFlat[pitchCenter];
    const indexFirst = this.alphaLetters.indexOf(firstNote[0]);
    const alphaScale = this.alphaLetters
      .slice(indexFirst)
      .concat(this.alphaLetters.slice(0, indexFirst));

    return absolutePitches.map(
      (el) => Utilities.enharmonics[Utilities.octaveMod(el)][alphaScale.shift()]
    );
  }

  static getVexScale(pitchCenter, modeCode, abstractPitches, vf) {
    const baseNotes = this.getBaseNotes(pitchCenter, modeCode, abstractPitches);
    console.log(baseNotes);
    let octave = 4;

    return baseNotes.map((el) => {
      const note =
        el.length > 1
          ? new vf.StaveNote({
              clef: 'treble',
              keys: [`${el}/${octave}`],
              duration: 'w',
            }).addAccidental(0, new vf.Accidental(el.slice(1)))
          : new vf.StaveNote({
              clef: 'treble',
              keys: [`${el}/${octave}`],
              duration: 'w',
            });
      el[0] === 'B' && octave++;
      return note;
    });
  }
}

export default VexScale;
