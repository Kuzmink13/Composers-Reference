/**
 * A class containing basic static methods and constants
 */
class Utilities {
  static noteNames = [
    'c',
    'c-Sharp',
    'd',
    'd-sharp',
    'e',
    'f',
    'f-sharp',
    'g',
    'g-sharp',
    'a',
    'a-sharp',
    'b',
  ];

  static tonalities = [
    [0, 2, 4, 6, 8, 10],
    [0, 3, 4, 7, 8, 11],
    [0, 2, 4, 5, 7, 9, 11],
    [0, 2, 3, 5, 7, 9, 11],
    [0, 2, 4, 5, 7, 8, 11],
    [0, 2, 3, 5, 7, 8, 11],
    [0, 1, 3, 4, 6, 7, 9, 10],
  ];

  static supportedScaleLengths = [6, 7, 8];

  static notesInOctave = 12;

  static octaveMod(pitch) {
    return (
      ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave
    );
  }
}

export default Utilities;
