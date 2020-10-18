import Utilities from './Utilities';

/**
 * A collection of successive pitches contained within an octave
 */
class PitchCollection {
  /**
   * Creates a new PitchCollection object
   * @param {Array<Numbers>} pitches - a non-empty array of abstract pitches where the difference between
   *    elements corresponds to the distance between the pitches in half-steps. Elements in the array must
   *    be strictly increasing.
   * @throws {Error} if the range of the pitch collection exceeds an octave
   */
  constructor(pitches) {
    let abstractPitches = pitches.map((el, i, arr) => el - arr[0]);

    if (abstractPitches.slice(-1) >= Utilities.notesInOctave)
      throw new Error('Range of PitchCollection exceeds an octave!');

    this.getAbstractPitches = function () {
      return abstractPitches.slice();
    };
    this.getAbstractModeCode = function () {
      return this.getAbstractPitches()
        .map((el) => el.toString(Utilities.notesInOctave))
        .join('');
    };
    this.getNoteQuantity = function () {
      return abstractPitches.length;
    };
  }
}

export default PitchCollection;
