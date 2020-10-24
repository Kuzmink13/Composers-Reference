import PitchCollection from './PitchCollection';
import Utilities from './Utilities';

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
   * @throws {Error} if the range of the pitch collection exceeds an octave
   */
  constructor(pitches, pitchCenter) {
    super(pitches);
    let absolutePitches = this.getAbstractPitches().map(
      (el) => Utilities.octaveMod(pitchCenter) + el
    );

    this.getAbsolutePitches = function () {
      return absolutePitches.slice();
    };
    this.getPitchCenter = function () {
      return absolutePitches[0];
    };
    this.getAbsoluteModeCode = function () {
      return `${this.getAbstractModeCode()}//${this.getPitchCenter()}`;
    };
    this.getModeName = function () {
      const key = this.getPitchCenter();
      const code = this.getAbstractModeCode();
      return `${
        Utilities.keyHasSharps(key, code)
          ? Utilities.noteNamesSharp[key]
          : Utilities.noteNamesFlat[key]
      } ${Utilities.modeNames[code]}`;
    };
  }
}

export default Mode;
