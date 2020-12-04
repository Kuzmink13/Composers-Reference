import PitchCollection from './PitchCollection';
import Scales from './Scales';
import Utilities from './Utilities';

const { modeProperties } = Utilities;

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
      const name = `${
        Scales.getBaseNotes(this.getPitchCenter(), this.getAbsolutePitches())[0]
      } ${modeProperties[this.getAbstractModeCode()].modeName}`;

      return Utilities.replaceSymbols(name);
    };
    this.getParentTonality = function () {
      return modeProperties[this.getAbstractModeCode()].parentTonality;
    };
    this.getModeProperties = function () {
      return {
        key: this.getAbsoluteModeCode(),
        pitchCenter: this.getPitchCenter(),
        absolutePitches: this.getAbsolutePitches(),
        abstractPitches: this.getAbstractPitches(),
        modeCode: this.getAbstractModeCode(),
        modeName: this.getModeName(),
        parentTonality: this.getParentTonality(),
      };
    };
  }
}

export default Mode;
