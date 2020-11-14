/**
 * A class containing basic static methods and constants
 */
class Utilities {
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
      modeNumber: 0,
      parentTonality: 'Whole-Tone',
    },

    // AUGMENTED SCALES
    '03478b': {
      modeName: 'Augmented',
      modeNumber: 0,
      parentTonality: 'Augmented',
    },
    '014589': {
      modeName: 'Augmented Inverse',
      modeNumber: 0,
      parentTonality: 'Augmented',
    },

    // MAJOR SCALES
    '024679b': {
      modeName: 'Lydian',
      modeNumber: 0,
      parentTonality: 'Major',
    },
    '024579b': {
      modeName: 'Ionian',
      modeNumber: 1,
      parentTonality: 'Major',
    },
    '024579a': {
      modeName: 'Mixolydian',
      modeNumber: 2,
      parentTonality: 'Major',
    },
    '023579a': {
      modeName: 'Dorian',
      modeNumber: 3,
      parentTonality: 'Major',
    },
    '023578a': {
      modeName: 'Aeolian',
      modeNumber: 4,
      parentTonality: 'Major',
    },
    '013578a': {
      modeName: 'Phrygian',
      modeNumber: 5,
      parentTonality: 'Major',
    },
    '013568a': {
      modeName: 'Locrian',
      modeNumber: 6,
      parentTonality: 'Major',
    },

    // MELODIC MINOR SCALES
    '024689b': {
      modeName: 'Lydian Augmented',
      modeNumber: 0,
      parentTonality: 'Melodic Minor',
    },
    '024679a': {
      modeName: 'Lydian Dominant',
      modeNumber: 1,
      parentTonality: 'Melodic Minor',
    },
    '024578a': {
      modeName: 'Aeolian Dominant',
      modeNumber: 2,
      parentTonality: 'Melodic Minor',
    },
    '023579b': {
      modeName: 'Melodic Minor',
      modeNumber: 3,
      parentTonality: 'Melodic Minor',
    },
    '013579a': {
      modeName: 'Dorian b2',
      modeNumber: 4,
      parentTonality: 'Melodic Minor',
    },
    '023568a': {
      modeName: 'Locrian nat2',
      modeNumber: 5,
      parentTonality: 'Melodic Minor',
    },
    '013468a': {
      modeName: 'Altered',
      modeNumber: 6,
      parentTonality: 'Melodic Minor',
    },

    // HARMONIC MINOR SCALES
    '024589b': {
      modeName: 'Major Augmented',
      modeNumber: 0,
      parentTonality: 'Harmonic Minor',
    },
    '034679b': {
      modeName: 'Lydian #2',
      modeNumber: 1,
      parentTonality: 'Harmonic Minor',
    },
    '014578a': {
      modeName: 'Phrygian Dominant',
      modeNumber: 2,
      parentTonality: 'Harmonic Minor',
    },
    '023578b': {
      modeName: 'Harmonic Minor',
      modeNumber: 3,
      parentTonality: 'Harmonic Minor',
    },
    '023679a': {
      modeName: 'Lydian Minor',
      modeNumber: 4,
      parentTonality: 'Harmonic Minor',
    },
    '013569a': {
      modeName: 'Locrian nat6',
      modeNumber: 5,
      parentTonality: 'Harmonic Minor',
    },
    '0134689': {
      modeName: 'Altered Diminished',
      modeNumber: 6,
      parentTonality: 'Harmonic Minor',
    },

    // HARMONIC MAJOR SCALES
    '034689b': {
      modeName: 'Lydian Augmented #2',
      modeNumber: 0,
      parentTonality: 'Harmonic Major',
    },
    '024578b': {
      modeName: 'Harmonic Major',
      modeNumber: 1,
      parentTonality: 'Harmonic Major',
    },
    '014579a': {
      modeName: 'Mixolydian b2',
      modeNumber: 2,
      parentTonality: 'Harmonic Major',
    },
    '023679b': {
      modeName: 'Melodic Minor #4',
      modeNumber: 3,
      parentTonality: 'Harmonic Major',
    },
    '013478a': {
      modeName: 'Altered nat5',
      modeNumber: 4,
      parentTonality: 'Harmonic Major',
    },
    '023569a': {
      modeName: 'Dorian b5',
      modeNumber: 5,
      parentTonality: 'Harmonic Major',
    },
    '0135689': {
      modeName: 'Locrian bb7',
      modeNumber: 6,
      parentTonality: 'Harmonic Major',
    },

    // DIMINISHED SCALES
    '0235689b': {
      modeName: 'Whole-Half Diminished',
      modeNumber: 0,
      parentTonality: 'Diminished',
    },
    '0134679a': {
      modeName: 'Half-Whole Diminished',
      modeNumber: 0,
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

  static getCompositeSharpness = (pitchCenter, modeCode) =>
    this.octaveMod(
      this.circleOfFifths[pitchCenter] -
        this.modeProperties[modeCode].modeNumber
    );

  static keyHasSharps = (note, modeCode) =>
    this.notesInOctave / 2 <= this.getCompositeSharpness(note, modeCode);

  static octaveMod = (pitch) =>
    ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave;

  static isWhite = (note) => this.noteNamesSharp[note].length === 1;

  static replaceSymbols(name) {
    return this.jsMusicSymbols.reduce((acc, el) => {
      const key = Object.keys(el)[0];
      return acc.replace(key, el[key]);
    }, name);
  }

  static getBaseNotes68(absolutePitches, keyHasSharps) {
    return absolutePitches.map((el) =>
      keyHasSharps
        ? this.noteNamesSharp[this.octaveMod(el)]
        : this.noteNamesFlat[this.octaveMod(el)]
    );
  }

  static getBaseNotes7(pitchCenter, absolutePitches, keyHasSharps) {
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
  }

  static getBaseNotes(pitchCenter, modeCode, absolutePitches) {
    const keyHasSharps = this.keyHasSharps(pitchCenter, modeCode);
    const scaleHasSevenNotes = absolutePitches.length === 7;

    return scaleHasSevenNotes
      ? this.getBaseNotes7(pitchCenter, absolutePitches, keyHasSharps)
      : this.getBaseNotes68(absolutePitches, keyHasSharps);
  }
}

export default Utilities;
