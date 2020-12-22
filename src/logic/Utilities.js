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
    { regex: /##/g, replacement: '\uD834\uDD2A' },
    { regex: /bb/g, replacement: '\uD834\uDD2B' },
    { regex: /#/g, replacement: '\u266F' },
    { regex: /b/g, replacement: '\u266D' },
    { regex: /nat/g, replacement: '\u266E' },
    { regex: /dim/g, replacement: '\uD834\uDDC8' },
  ];

  static circleOfFifths = [6, 1, 8, 3, 10, 5, 0, 7, 2, 9, 4, 11];

  static notesInOctave = 12;

  static notesInAPerfectFifth = 7;

  static octaveMod = (pitch) =>
    ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave;

  static replaceSymbols(str) {
    return this.jsMusicSymbols.reduce(
      (acc, symbol) => acc.replace(symbol.regex, symbol.replacement),
      str
    );
  }
}

export default Utilities;
