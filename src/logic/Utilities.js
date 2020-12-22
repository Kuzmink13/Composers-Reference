/**
 * A class containing basic static methods and constants
 */
class Utilities {
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
