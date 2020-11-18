/**
 * A class containing basic static methods and constants
 */
class Utilities {
  static keyNotes = [
    {
      absoluteName: 'C',
      sharpName: 'C',
      flatName: 'C',
      enharmonics: { B: 'B#', C: 'C', D: 'Dbb' },
      isWhite: true,
    },
    {
      absoluteName: 'C#/Db',
      sharpName: 'C#',
      flatName: 'Db',
      enharmonics: { B: 'B##', C: 'C#', D: 'Db' },
      isWhite: false,
    },
    {
      absoluteName: 'D',
      sharpName: 'D',
      flatName: 'D',
      enharmonics: { C: 'C##', D: 'D', E: 'Ebb' },
      isWhite: true,
    },
    {
      absoluteName: 'D#/Eb',
      sharpName: 'D#',
      flatName: 'Eb',
      enharmonics: { D: 'D#', E: 'Eb', F: 'Fbb' },
      isWhite: false,
    },
    {
      absoluteName: 'E',
      sharpName: 'E',
      flatName: 'Fb',
      enharmonics: { D: 'D##', E: 'E', F: 'Fb' },
      isWhite: true,
    },
    {
      absoluteName: 'F',
      sharpName: 'E#',
      flatName: 'F',
      enharmonics: { E: 'E#', F: 'F', G: 'Gbb' },
      isWhite: true,
    },
    {
      absoluteName: 'F#/Gb',
      sharpName: 'F#',
      flatName: 'Gb',
      enharmonics: { E: 'E##', F: 'F#', G: 'Gb' },
      isWhite: false,
    },
    {
      absoluteName: 'G',
      sharpName: 'G',
      flatName: 'G',
      enharmonics: { F: 'F##', G: 'G', A: 'Abb' },
      isWhite: true,
    },
    {
      absoluteName: 'G#/Ab',
      sharpName: 'G#',
      flatName: 'Ab',
      enharmonics: { G: 'G#', A: 'Ab' },
      isWhite: false,
    },
    {
      absoluteName: 'A',
      sharpName: 'A',
      flatName: 'A',
      enharmonics: { G: 'G##', A: 'A', B: 'Bbb' },
      isWhite: true,
    },
    {
      absoluteName: 'A#/Bb',
      sharpName: 'A#',
      flatName: 'Bb',
      enharmonics: { A: 'A#', B: 'Bb', C: 'Cbb' },
      isWhite: false,
    },
    {
      absoluteName: 'B',
      sharpName: 'B',
      flatName: 'Cb',
      enharmonics: { A: 'A##', B: 'B', C: 'Cb' },
      isWhite: true,
    },
  ];

  static oneLetterWholeSteps = {
    Cb: 'C#',
    Db: 'D#',
    Eb: 'E#',
    Fb: 'F#',
    Gb: 'G#',
    Ab: 'A#',
    Bb: 'B#',
  };

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
    { name: 'Whole-Tone', pitches: [0, 2, 4, 6, 8, 10] },
    { name: 'Augmented', pitches: [0, 3, 4, 7, 8, 11] },
    { name: 'Major', pitches: [0, 2, 4, 5, 7, 9, 11] },
    { name: 'Melodic Minor', pitches: [0, 2, 3, 5, 7, 9, 11] },
    { name: 'Harmonic Minor', pitches: [0, 2, 3, 5, 7, 8, 11] },
    { name: 'Harmonic Major', pitches: [0, 2, 4, 5, 7, 8, 11] },
    { name: 'Diminished', pitches: [0, 1, 3, 4, 6, 7, 9, 10] },
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
      parentTonality: 'Melodic-Minor',
    },
    '024679a': {
      modeName: 'Lydian Dominant',
      modeNumber: 1,
      parentTonality: 'Melodic-Minor',
    },
    '024578a': {
      modeName: 'Aeolian Dominant',
      modeNumber: 2,
      parentTonality: 'Melodic-Minor',
    },
    '023579b': {
      modeName: 'Melodic Minor',
      modeNumber: 3,
      parentTonality: 'Melodic-Minor',
    },
    '013579a': {
      modeName: 'Dorian b2',
      modeNumber: 4,
      parentTonality: 'Melodic-Minor',
    },
    '023568a': {
      modeName: 'Locrian nat2',
      modeNumber: 5,
      parentTonality: 'Melodic-Minor',
    },
    '013468a': {
      modeName: 'Altered',
      modeNumber: 6,
      parentTonality: 'Melodic-Minor',
    },

    // HARMONIC MINOR SCALES
    '024589b': {
      modeName: 'Major Augmented',
      modeNumber: 0,
      parentTonality: 'Harmonic-Minor',
    },
    '034679b': {
      modeName: 'Lydian #2',
      modeNumber: 1,
      parentTonality: 'Harmonic-Minor',
    },
    '014578a': {
      modeName: 'Phrygian Dominant',
      modeNumber: 2,
      parentTonality: 'Harmonic-Minor',
    },
    '023578b': {
      modeName: 'Harmonic Minor',
      modeNumber: 3,
      parentTonality: 'Harmonic-Minor',
    },
    '023679a': {
      modeName: 'Lydian Minor',
      modeNumber: 4,
      parentTonality: 'Harmonic-Minor',
    },
    '013569a': {
      modeName: 'Locrian nat6',
      modeNumber: 5,
      parentTonality: 'Harmonic-Minor',
    },
    '0134689': {
      modeName: 'Altered Diminished',
      modeNumber: 6,
      parentTonality: 'Harmonic-Minor',
    },

    // HARMONIC MAJOR SCALES
    '034689b': {
      modeName: 'Lydian Augmented #2',
      modeNumber: 0,
      parentTonality: 'Harmonic-Major',
    },
    '024578b': {
      modeName: 'Harmonic Major',
      modeNumber: 1,
      parentTonality: 'Harmonic-Major',
    },
    '014579a': {
      modeName: 'Mixolydian b2',
      modeNumber: 2,
      parentTonality: 'Harmonic-Major',
    },
    '023679b': {
      modeName: 'Melodic Minor #4',
      modeNumber: 3,
      parentTonality: 'Harmonic-Major',
    },
    '013478a': {
      modeName: 'Altered nat5',
      modeNumber: 4,
      parentTonality: 'Harmonic-Major',
    },
    '023569a': {
      modeName: 'Dorian b5',
      modeNumber: 5,
      parentTonality: 'Harmonic-Major',
    },
    '0135689': {
      modeName: 'Locrian bb7',
      modeNumber: 6,
      parentTonality: 'Harmonic-Major',
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

  static octaveMod = (pitch) =>
    ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave;

  static replaceSymbols(name) {
    return this.jsMusicSymbols.reduce((acc, el) => {
      const key = Object.keys(el)[0];
      return acc.replace(key, el[key]);
    }, name);
  }

  static getShortestScale(scaleSharp, scaleFlat) {
    return scaleSharp.join().length <= scaleFlat.join().length
      ? scaleSharp
      : scaleFlat;
  }

  static getBaseNotesDefault(absolutePitches) {
    const getScale = (keyHasSharps, absolutePitches) =>
      absolutePitches.map((el) =>
        keyHasSharps
          ? this.keyNotes[this.octaveMod(el)].sharpName
          : this.keyNotes[this.octaveMod(el)].flatName
      );

    return this.getShortestScale(
      getScale(true, absolutePitches),
      getScale(false, absolutePitches)
    );
  }

  static getBaseNotes7(absolutePitches, pitchCenter) {
    const getScale = (keyHasSharps, absolutePitches, pitchCenter) => {
      const firstNote = keyHasSharps
        ? this.keyNotes[pitchCenter].sharpName
        : this.keyNotes[pitchCenter].flatName;
      const indexFirst = this.alphaLetters.indexOf(firstNote[0]);
      const alphaScale = this.alphaLetters
        .slice(indexFirst)
        .concat(this.alphaLetters.slice(0, indexFirst));

      return absolutePitches.map(
        (el) =>
          this.keyNotes[this.octaveMod(el)].enharmonics[alphaScale.shift()]
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
        ? this.keyNotes[pitchCenter].sharpName
        : this.keyNotes[pitchCenter].flatName;
      const indexFirst = this.alphaLetters.indexOf(firstNote[0]);
      const alphaScale = this.alphaLetters
        .slice(indexFirst)
        .concat(this.alphaLetters.slice(0, indexFirst));

      let scale = [];
      let hasSameNoteLetter = false;
      let skipNext = false;

      absolutePitches.forEach((el, i) => {
        if (!skipNext) {
          let note = this.keyNotes[this.octaveMod(el)].enharmonics[
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
      default:
        return this.getBaseNotesDefault(absolutePitches);
    }
  }
}

export default Utilities;
