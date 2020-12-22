import Scales from '../logic/Scales';
import Utilities from '../logic/Utilities';

import PitchCollection from './PitchCollection';

const { modeProperties, notesInOctave, notesInAPerfectFifth } = Utilities;

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
  constructor(pitches, pitchCenter = pitches[0]) {
    super(pitches);
    this.pitchCenter = Utilities.octaveMod(pitchCenter);
  }

  fromCode(modeCode, pitchCenter) {
    return new Mode(
      modeCode.split('').map((el) => parseInt(Number(`0x${el}`), 10)),
      pitchCenter
    );
  }

  getAbsolutePitches() {
    return this.getAbstractPitches().map(
      (el) => Utilities.octaveMod(this.pitchCenter) + el
    );
  }

  getPitchCenter() {
    return this.pitchCenter;
  }

  getAbsoluteModeCode() {
    return `${this.getAbstractModeCode()}//${this.getPitchCenter()}`;
  }

  getBaseNotes() {
    return Scales.getBaseNotes(
      this.getPitchCenter(),
      this.getAbsolutePitches()
    );
  }

  getModeRoot() {
    return this.getBaseNotes()[0];
  }

  getModeName() {
    const name = `${this.getModeRoot()} ${
      modeProperties[this.getAbstractModeCode()].modeName
    }`;

    return Utilities.replaceSymbols(name);
  }

  getParentTonality() {
    return modeProperties[this.getAbstractModeCode()].parentTonality;
  }

  relativeShift(isFwShift) {
    let pitches = this.getAbsolutePitches();

    isFwShift
      ? pitches.push(pitches.shift() + notesInOctave)
      : pitches.unshift(pitches.pop() - notesInOctave);

    return new Mode(pitches);
  }

  parallelShift(isFwShift, pitchCenter = this.getPitchCenter()) {
    const modeCode = this.getAbstractModeCode();

    const code = isFwShift
      ? Utilities.modeProperties[modeCode].nextMode
      : Utilities.modeProperties[modeCode].previousMode;

    return this.fromCode(code, pitchCenter);
  }

  keyShift(isFwShift) {
    const pitches = this.getAbsolutePitches();
    const pitchCenter = this.getPitchCenter();

    return new Mode(
      pitches,
      isFwShift
        ? pitchCenter + notesInAPerfectFifth
        : pitchCenter - notesInAPerfectFifth
    );
  }

  relativeBrightnessShift(isFwShift) {
    const pitches = this.getAbsolutePitches();
    const newPitchCenter = isFwShift ? pitches[3] : pitches[4];

    return this.parallelShift(isFwShift, newPitchCenter);
  }
}

export default Mode;
