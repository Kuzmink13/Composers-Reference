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

  static jsMusicSymbols = [
    { '##': '\uD834\uDD2A' },
    { bb: '\uD834\uDD2B' },
    { '#': '\u266F' },
    { b: '\u266D' },
    { nat: '\u266E' },
    { dim: '\uD834\uDDC8' },
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

  static modeProperties = {
    // WHOLE TONE SCALES
    '02468a': {
      modeName: 'Whole-Tone',
      modeNumber: 0,
      parentTonality: 'Whole-Tone',
      previousMode: '02468a',
      nextMode: '02468a',
    },

    // AUGMENTED SCALES
    '03478b': {
      modeName: 'Augmented',
      modeNumber: 0,
      parentTonality: 'Augmented',
      previousMode: '014589',
      nextMode: '014589',
    },
    '014589': {
      modeName: 'Augmented Inverse',
      modeNumber: 0,
      parentTonality: 'Augmented',
      previousMode: '03478b',
      nextMode: '03478b',
    },

    // MAJOR SCALES
    '024679b': {
      modeName: 'Lydian',
      modeNumber: 0,
      parentTonality: 'Major',
      previousMode: '024579b',
      nextMode: '013568a',
    },
    '024579b': {
      modeName: 'Ionian',
      modeNumber: 1,
      parentTonality: 'Major',
      previousMode: '024579a',
      nextMode: '024679b',
    },
    '024579a': {
      modeName: 'Mixolydian',
      modeNumber: 2,
      parentTonality: 'Major',
      previousMode: '023579a',
      nextMode: '024579b',
    },
    '023579a': {
      modeName: 'Dorian',
      modeNumber: 3,
      parentTonality: 'Major',
      previousMode: '023578a',
      nextMode: '024579a',
    },
    '023578a': {
      modeName: 'Aeolian',
      modeNumber: 4,
      parentTonality: 'Major',
      previousMode: '013578a',
      nextMode: '023579a',
    },
    '013578a': {
      modeName: 'Phrygian',
      modeNumber: 5,
      parentTonality: 'Major',
      previousMode: '013568a',
      nextMode: '023578a',
    },
    '013568a': {
      modeName: 'Locrian',
      modeNumber: 6,
      parentTonality: 'Major',
      previousMode: '024679b',
      nextMode: '013578a',
    },

    // MELODIC MINOR SCALES
    '024689b': {
      modeName: 'Lydian Augmented',
      modeNumber: 0,
      parentTonality: 'Melodic-Minor',
      previousMode: '024679a',
      nextMode: '013468a',
    },
    '024679a': {
      modeName: 'Lydian Dominant',
      modeNumber: 1,
      parentTonality: 'Melodic-Minor',
      previousMode: '024578a',
      nextMode: '024689b',
    },
    '024578a': {
      modeName: 'Aeolian Dominant',
      modeNumber: 2,
      parentTonality: 'Melodic-Minor',
      previousMode: '023579b',
      nextMode: '024679a',
    },
    '023579b': {
      modeName: 'Melodic Minor',
      modeNumber: 3,
      parentTonality: 'Melodic-Minor',
      previousMode: '013579a',
      nextMode: '024578a',
    },
    '013579a': {
      modeName: 'Dorian b2',
      modeNumber: 4,
      parentTonality: 'Melodic-Minor',
      previousMode: '023568a',
      nextMode: '023579b',
    },
    '023568a': {
      modeName: 'Locrian nat2',
      modeNumber: 5,
      parentTonality: 'Melodic-Minor',
      previousMode: '013468a',
      nextMode: '013579a',
    },
    '013468a': {
      modeName: 'Altered',
      modeNumber: 6,
      parentTonality: 'Melodic-Minor',
      previousMode: '024689b',
      nextMode: '023568a',
    },

    // HARMONIC MINOR SCALES
    '024589b': {
      modeName: 'Major Augmented',
      modeNumber: 0,
      parentTonality: 'Harmonic-Minor',
      previousMode: '034679b',
      nextMode: '0134689',
    },
    '034679b': {
      modeName: 'Lydian #2',
      modeNumber: 1,
      parentTonality: 'Harmonic-Minor',
      previousMode: '014578a',
      nextMode: '024589b',
    },
    '014578a': {
      modeName: 'Phrygian Dominant',
      modeNumber: 2,
      parentTonality: 'Harmonic-Minor',
      previousMode: '023578b',
      nextMode: '034679b',
    },
    '023578b': {
      modeName: 'Harmonic Minor',
      modeNumber: 3,
      parentTonality: 'Harmonic-Minor',
      previousMode: '023679a',
      nextMode: '014578a',
    },
    '023679a': {
      modeName: 'Lydian Minor',
      modeNumber: 4,
      parentTonality: 'Harmonic-Minor',
      previousMode: '013569a',
      nextMode: '023578b',
    },
    '013569a': {
      modeName: 'Locrian nat6',
      modeNumber: 5,
      parentTonality: 'Harmonic-Minor',
      previousMode: '0134689',
      nextMode: '023679a',
    },
    '0134689': {
      modeName: 'Altered Diminished',
      modeNumber: 6,
      parentTonality: 'Harmonic-Minor',
      previousMode: '024589b',
      nextMode: '013569a',
    },

    // HARMONIC MAJOR SCALES
    '034689b': {
      modeName: 'Lydian Augmented #2',
      modeNumber: 0,
      parentTonality: 'Harmonic-Major',
      previousMode: '024578b',
      nextMode: '0135689',
    },
    '024578b': {
      modeName: 'Harmonic Major',
      modeNumber: 1,
      parentTonality: 'Harmonic-Major',
      previousMode: '014579a',
      nextMode: '034689b',
    },
    '014579a': {
      modeName: 'Mixolydian b2',
      modeNumber: 2,
      parentTonality: 'Harmonic-Major',
      previousMode: '023679b',
      nextMode: '024578b',
    },
    '023679b': {
      modeName: 'Melodic Minor #4',
      modeNumber: 3,
      parentTonality: 'Harmonic-Major',
      previousMode: '013478a',
      nextMode: '014579a',
    },
    '013478a': {
      modeName: 'Altered nat5',
      modeNumber: 4,
      parentTonality: 'Harmonic-Major',
      previousMode: '023569a',
      nextMode: '023679b',
    },
    '023569a': {
      modeName: 'Dorian b5',
      modeNumber: 5,
      parentTonality: 'Harmonic-Major',
      previousMode: '0135689',
      nextMode: '013478a',
    },
    '0135689': {
      modeName: 'Locrian bb7',
      modeNumber: 6,
      parentTonality: 'Harmonic-Major',
      previousMode: '034689b',
      nextMode: '023569a',
    },

    // DIMINISHED SCALES
    '0235689b': {
      modeName: 'Whole-Half Diminished',
      modeNumber: 0,
      parentTonality: 'Diminished',
      previousMode: '0134679a',
      nextMode: '0134679a',
    },
    '0134679a': {
      modeName: 'Half-Whole Diminished',
      modeNumber: 0,
      parentTonality: 'Diminished',
      previousMode: '0235689b',
      nextMode: '0235689b',
    },
  };

  static circleOfFifths = [6, 1, 8, 3, 10, 5, 0, 7, 2, 9, 4, 11];

  static notesInOctave = 12;

  static notesInAPerfectFifth = 7;

  static octaveMod = (pitch) =>
    ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave;

  static replaceSymbols(name) {
    return this.jsMusicSymbols.reduce((acc, el) => {
      const key = Object.keys(el)[0];
      return acc.replace(key, el[key]);
    }, name);
  }
}

export default Utilities;
