const notesInOctave = 12;
const octaveMod = function(pitch) {
  return ((pitch % notesInOctave) + notesInOctave) % notesInOctave;
}

/**
 * A collection of successive pitches contained within an octave
 */
class PitchCollection {
  /**
   * Creates a new PitchCollection object
   * @param {Array<Numbers>} pitches - a non-empty array of abstract pitches where the difference between
   *    elements corresponds to the distance between the pitches in half-steps. Elements in the array must
   *    be strictly increasing.
   * @throws {Error} if the range of the pitch collection exceeds an octave.
   */
  constructor(pitches) {
    let abstractPitches = pitches.map((el, i, arr) => el - arr[0]);

    if (abstractPitches.slice(-1) >= notesInOctave) throw new Error("Range of PitchCollection exceeds an octave!");

    this.getAbstractPitches = function() {
      return abstractPitches.slice();
    }
    this.getNoteQuantity = function() {
      return abstractPitches.length;
    }
  }
}

/**
 * A collection of successive pitches contained within an octave that start at a specific note
 */
class Mode extends PitchCollection {
  /**
   * Creates a new Mode object
   * @param {Array<Numbers>} pitches - a non-empty array of abstract pitches where the difference between
   *    elements corresponds to the distance between the pitches in half-steps. Elements in the array must
   *    be strictly increasing.
   * @param {Number} pitchCenter - a number representing a pitch class where 0 is c, 1 is c-sharp/d-flat, ... , 11 is b
   * @throws {Error} if the range of the pitch collection exceeds an octave.
   */
  constructor(pitches, pitchCenter) {
    super(pitches);
    let absolutePitches = this.getAbstractPitches().map(el => octaveMod(pitchCenter) + el);

    this.getAbsolutePitches = function() {
      return absolutePitches.slice()
    }
    this.getPitchCenter = function() {
      return absolutePitches[0];
    }
  }
}

module.exports = {
  PitchCollection: PitchCollection,
  Mode: Mode
}