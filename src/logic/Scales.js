import * as notes from '../assets/notes.json';

import Utilities from './Utilities';

class Scales {
  static alphaLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  static oneLetterWholeSteps = {
    Cb: 'C#',
    Db: 'D#',
    Eb: 'E#',
    Fb: 'F#',
    Gb: 'G#',
    Ab: 'A#',
    Bb: 'B#',
  };

  static supportedScaleLengths = [6, 7, 8];

  static getShortestScale(scaleSharp, scaleFlat) {
    return scaleSharp.join().length <= scaleFlat.join().length
      ? scaleSharp
      : scaleFlat;
  }

  static getBaseNotesDefault(absolutePitches) {
    const getScale = (keyHasSharps, absolutePitches) =>
      absolutePitches.map((el) =>
        keyHasSharps
          ? notes.default[Utilities.octaveMod(el)].sharpName
          : notes.default[Utilities.octaveMod(el)].flatName
      );

    return this.getShortestScale(
      getScale(true, absolutePitches),
      getScale(false, absolutePitches)
    );
  }

  static getBaseNotes6(absolutePitches) {
    const scale = [];

    absolutePitches.forEach((el, i) => {
      const key = notes.default[Utilities.octaveMod(el)];
      const prev = scale[i - 1] || ' ';

      key.sharpName.length <= key.flatName.length &&
      prev[0] !== key.sharpName[0]
        ? scale.push(key.sharpName)
        : scale.push(key.flatName);
    });

    return scale;
  }

  static getBaseNotes7(absolutePitches, pitchCenter) {
    const getScale = (keyHasSharps, absolutePitches, pitchCenter) => {
      const firstNote = keyHasSharps
        ? notes.default[pitchCenter].sharpName
        : notes.default[pitchCenter].flatName;
      const indexFirst = this.alphaLetters.indexOf(firstNote[0]);
      const alphaScale = this.alphaLetters
        .slice(indexFirst)
        .concat(this.alphaLetters.slice(0, indexFirst));

      return absolutePitches.map(
        (el) =>
          notes.default[Utilities.octaveMod(el)].enharmonics[alphaScale.shift()]
      );
    };

    return this.getShortestScale(
      getScale(true, absolutePitches, pitchCenter),
      getScale(false, absolutePitches, pitchCenter)
    );
  }

  static getBaseNotes8(absolutePitches, pitchCenter) {
    const getScale = (keyHasSharps, absolutePitches, pitchCenter) => {
      const isWholeStep = (i) =>
        absolutePitches[i + 1] - absolutePitches[i] === 2;

      const firstNote = keyHasSharps
        ? notes.default[pitchCenter].sharpName
        : notes.default[pitchCenter].flatName;
      const indexFirst = this.alphaLetters.indexOf(firstNote[0]);
      const alphaScale = this.alphaLetters
        .slice(indexFirst)
        .concat(this.alphaLetters.slice(0, indexFirst));

      let scale = [];
      let hasSameNoteLetter = false;
      let skipNext = false;

      absolutePitches.forEach((el, i) => {
        if (!skipNext) {
          let note =
            notes.default[Utilities.octaveMod(el)].enharmonics[
              alphaScale.shift()
            ];
          if (note === undefined) note = 'undefined';
          scale.push(note);
          if (
            isWholeStep(i) &&
            !hasSameNoteLetter &&
            this.oneLetterWholeSteps[note]
          ) {
            scale.push(this.oneLetterWholeSteps[note]);
            hasSameNoteLetter = true;
            skipNext = true;
          }
        } else {
          skipNext = false;
        }
      });

      return scale;
    };

    return this.getShortestScale(
      getScale(true, absolutePitches, pitchCenter),
      getScale(false, absolutePitches, pitchCenter)
    );
  }

  static getBaseNotes(pitchCenter, absolutePitches) {
    switch (absolutePitches.length) {
      case 8:
        return this.getBaseNotes8(absolutePitches, pitchCenter);
      case 7:
        return this.getBaseNotes7(absolutePitches, pitchCenter);
      case 6:
        return this.getBaseNotes6(absolutePitches);
      default:
        return this.getBaseNotesDefault(absolutePitches);
    }
  }
}

export default Scales;
