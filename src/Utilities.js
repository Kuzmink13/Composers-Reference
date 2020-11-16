/**
 * A class containing basic static methods and constants
 */
class Utilities {
  static isWhite = [
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
  ];

  static absoluteNoteNames = [
    'C',
    'C#/Db',
    'D',
    'D#/Eb',
    'E',
    'F',
    'F#/Gb',
    'G',
    'G#/Ab',
    'A',
    'A#/Bb',
    'B',
  ];

  static noteNamesSharp = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'E#',
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
    'Fb',
    'F',
    'Gb',
    'G',
    'Ab',
    'A',
    'Bb',
    'Cb',
  ];

  static enharmonics = [
    { B: 'B#', C: 'C', D: 'Dbb' },
    { B: 'B##', C: 'C#', D: 'Db' },
    { C: 'C##', D: 'D', E: 'Ebb' },
    { D: 'D#', E: 'Eb', F: 'Fbb' },
    { D: 'D##', E: 'E', F: 'Fb' },
    { E: 'E#', F: 'F', G: 'Gbb' },
    { E: 'E##', F: 'F#', G: 'Gb' },
    { F: 'F##', G: 'G', A: 'Abb' },
    { G: 'G#', A: 'Ab' },
    { G: 'G##', A: 'A', B: 'Bbb' },
    { A: 'A#', B: 'Bb', C: 'Cbb' },
    { A: 'A##', B: 'B', C: 'Cb' },
  ];

  static jsMusicSymbols = [
    { '##': '\uD834\uDD2A' },
    { bb: '\uD834\uDD2B' },
    { '#': '\u266F' },
    { b: '\u266D' },
    { nat: '\u266E' },
    { 'half-diminished': '\uD834\uDDA9' },
    { diminished: '\u00B0' },
  ];

  static tonalities = [
    [0, 2, 4, 6, 8, 10],
    [0, 3, 4, 7, 8, 11],
    [0, 2, 4, 5, 7, 9, 11],
    [0, 2, 3, 5, 7, 9, 11],
    [0, 2, 3, 5, 7, 8, 11],
    [0, 2, 4, 5, 7, 8, 11],
    [0, 1, 3, 4, 6, 7, 9, 10],
  ];

  static tonalityNames = [
    'Whole-Tone',
    'Augmented',
    'Major',
    'Melodic Minor',
    'Harmonic Minor',
    'Harmonic Major',
    'Diminished',
  ];

  static supportedClefs = ['treble', 'alto', 'bass'];

  static supportedScaleLengths = [6, 7, 8];

  static modeProperties = {
    // WHOLE TONE SCALES
    '02468a': {
      modeName: 'Whole-Tone',
      parentTonality: 'Whole-Tone',
    },

    // AUGMENTED SCALES
    '03478b': {
      modeName: 'Augmented',
      parentTonality: 'Augmented',
    },
    '014589': {
      modeName: 'Augmented Inverse',
      parentTonality: 'Augmented',
    },

    // MAJOR SCALES
    '024679b': {
      modeName: 'Lydian',
      parentTonality: 'Major',
    },
    '024579b': {
      modeName: 'Ionian',
      parentTonality: 'Major',
    },
    '024579a': {
      modeName: 'Mixolydian',
      parentTonality: 'Major',
    },
    '023579a': {
      modeName: 'Dorian',
      parentTonality: 'Major',
    },
    '023578a': {
      modeName: 'Aeolian',
      parentTonality: 'Major',
    },
    '013578a': {
      modeName: 'Phrygian',
      parentTonality: 'Major',
    },
    '013568a': {
      modeName: 'Locrian',
      parentTonality: 'Major',
    },

    // MELODIC MINOR SCALES
    '024689b': {
      modeName: 'Lydian Augmented',
      parentTonality: 'Melodic-Minor',
    },
    '024679a': {
      modeName: 'Lydian Dominant',
      parentTonality: 'Melodic-Minor',
    },
    '024578a': {
      modeName: 'Aeolian Dominant',
      parentTonality: 'Melodic-Minor',
    },
    '023579b': {
      modeName: 'Melodic Minor',
      parentTonality: 'Melodic-Minor',
    },
    '013579a': {
      modeName: 'Dorian b2',
      parentTonality: 'Melodic-Minor',
    },
    '023568a': {
      modeName: 'Locrian nat2',
      parentTonality: 'Melodic-Minor',
    },
    '013468a': {
      modeName: 'Altered',
      parentTonality: 'Melodic-Minor',
    },

    // HARMONIC MINOR SCALES
    '024589b': {
      modeName: 'Major Augmented',
      parentTonality: 'Harmonic-Minor',
    },
    '034679b': {
      modeName: 'Lydian #2',
      parentTonality: 'Harmonic-Minor',
    },
    '014578a': {
      modeName: 'Phrygian Dominant',
      parentTonality: 'Harmonic-Minor',
    },
    '023578b': {
      modeName: 'Harmonic Minor',
      parentTonality: 'Harmonic-Minor',
    },
    '023679a': {
      modeName: 'Lydian Minor',
      parentTonality: 'Harmonic-Minor',
    },
    '013569a': {
      modeName: 'Locrian nat6',
      parentTonality: 'Harmonic-Minor',
    },
    '0134689': {
      modeName: 'Altered Diminished',
      parentTonality: 'Harmonic-Minor',
    },

    // HARMONIC MAJOR SCALES
    '034689b': {
      modeName: 'Lydian Augmented #2',
      parentTonality: 'Harmonic-Major',
    },
    '024578b': {
      modeName: 'Harmonic Major',
      parentTonality: 'Harmonic-Major',
    },
    '014579a': {
      modeName: 'Mixolydian b2',
      parentTonality: 'Harmonic-Major',
    },
    '023679b': {
      modeName: 'Melodic Minor #4',
      parentTonality: 'Harmonic-Major',
    },
    '013478a': {
      modeName: 'Altered nat5',
      parentTonality: 'Harmonic-Major',
    },
    '023569a': {
      modeName: 'Dorian b5',
      parentTonality: 'Harmonic-Major',
    },
    '0135689': {
      modeName: 'Locrian bb7',
      parentTonality: 'Harmonic-Major',
    },

    // DIMINISHED SCALES
    '0235689b': {
      modeName: 'Whole-Half Diminished',
      parentTonality: 'Diminished',
    },
    '0134679a': {
      modeName: 'Half-Whole Diminished',
      parentTonality: 'Diminished',
    },
  };

  static alphaLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  static circleOfFifths = [6, 1, 8, 3, 10, 5, 0, 7, 2, 9, 4, 11];

  static notesInOctave = 12;

  static keyMap = {
    q: 0,
    2: 1,
    w: 2,
    3: 3,
    e: 4,
    r: 5,
    5: 6,
    t: 7,
    6: 8,
    y: 9,
    7: 10,
    u: 11,
    i: 0,

    z: 0,
    s: 1,
    x: 2,
    d: 3,
    c: 4,
    v: 5,
    g: 6,
    b: 7,
    h: 8,
    n: 9,
    j: 10,
    m: 11,
    ',': 0,
    '<': 0,
  };

  static octaveMod = (pitch) =>
    ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave;

  static replaceSymbols(name) {
    return this.jsMusicSymbols.reduce((acc, el) => {
      const key = Object.keys(el)[0];
      return acc.replace(key, el[key]);
    }, name);
  }

  static getShortestScale(scaleSharp, scaleFlat) {
    console.log(scaleSharp, scaleFlat);
    return scaleSharp.join().length < scaleFlat.join().length
      ? scaleSharp
      : scaleFlat;
  }

  static getBaseNotesDefault(absolutePitches) {
    const getScale = (keyHasSharps, absolutePitches) =>
      absolutePitches.map((el) =>
        keyHasSharps
          ? this.noteNamesSharp[this.octaveMod(el)]
          : this.noteNamesFlat[this.octaveMod(el)]
      );

    return this.getShortestScale(
      getScale(true, absolutePitches),
      getScale(false, absolutePitches)
    );
  }

  static getBaseNotes7(absolutePitches, pitchCenter) {
    const getScale = (keyHasSharps, absolutePitches, pitchCenter) => {
      const firstNote = keyHasSharps
        ? this.noteNamesSharp[pitchCenter]
        : this.noteNamesFlat[pitchCenter];
      const indexFirst = this.alphaLetters.indexOf(firstNote[0]);
      const alphaScale = this.alphaLetters
        .slice(indexFirst)
        .concat(this.alphaLetters.slice(0, indexFirst));

      return absolutePitches.map(
        (el) => this.enharmonics[this.octaveMod(el)][alphaScale.shift()]
      );
    };

    return this.getShortestScale(
      getScale(true, absolutePitches, pitchCenter),
      getScale(false, absolutePitches, pitchCenter)
    );
  }

  static getBaseNotes8(absolutePitches) {
    // NEEDS TO BE UPDATED
    return this.getBaseNotesDefault(absolutePitches);
  }

  static getBaseNotes(pitchCenter, absolutePitches) {
    switch (absolutePitches.length) {
      case 8:
        return this.getBaseNotes8(absolutePitches);
      case 7:
        return this.getBaseNotes7(absolutePitches, pitchCenter);
      default:
        return this.getBaseNotesDefault(absolutePitches);
    }
  }
}

export default Utilities;
