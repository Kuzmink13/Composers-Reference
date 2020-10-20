/**
 * A class containing basic static methods and constants
 */
class Utilities {
  static noteNames = [
    'c',
    'cSharp',
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

  static notesInOctave = 12;

  static octaveMod(pitch) {
    return (
      ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave
    );
  }
}

export default Utilities;
