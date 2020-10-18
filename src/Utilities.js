/**
 * A class containing basic static methods and constants
 */
class Utilities {
  static notesInOctave = 12;

  static octaveMod(pitch) {
    return (
      ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave
    );
  }
}

export default Utilities;
