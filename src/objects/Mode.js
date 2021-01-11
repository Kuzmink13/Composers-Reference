import * as modeProps from '../assets/modeProperties.json';

import getScaleNotes from '../logic/getScaleNotes';
import getChordList from '../logic/getChordList';
import playback from '../logic/playback';
import {
  octaveMod,
  replaceSymbols,
  notesInOctave,
  notesInPerfectFifth,
} from '../logic/utilities';

import PitchCollection from './PitchCollection';

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
    this.pitchCenter = octaveMod(pitchCenter);
  }

  fromCode(modeCode, pitchCenter) {
    return new Mode(
      modeCode.split('').map((el) => parseInt(Number(`0x${el}`), 10)),
      pitchCenter
    );
  }

  getAbsolutePitches() {
    return this.getAbstractPitches().map(
      (el) => octaveMod(this.pitchCenter) + el
    );
  }

  getPitchCenter() {
    return this.pitchCenter;
  }

  getAbsoluteModeCode() {
    return `${this.getAbstractModeCode()}//${this.getPitchCenter()}`;
  }

  getScaleNotes() {
    if (!this.scaleNotes) {
      this.scaleNotes = JSON.stringify(getScaleNotes(this));
    }

    return JSON.parse(this.scaleNotes);
  }

  getModeRoot() {
    return this.getScaleNotes()[0];
  }

  getModeName() {
    const name = `${this.getModeRoot()} ${
      modeProps.default[this.getAbstractModeCode()].modeName
    }`;

    return replaceSymbols(name);
  }

  getParentTonality() {
    return modeProps.default[this.getAbstractModeCode()].parentTonality;
  }

  getSharpness() {
    return this.getAbstractPitches().reduce((acc, pitch) => acc + pitch);
  }

  getChordList() {
    return getChordList(this);
  }

  play() {
    playback(this);
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
      ? modeProps.default[modeCode].nextMode
      : modeProps.default[modeCode].previousMode;

    return code ? this.fromCode(code, pitchCenter) : this;
  }

  keyShift(isFwShift) {
    const pitches = this.getAbsolutePitches();
    const pitchCenter = this.getPitchCenter();

    return new Mode(
      pitches,
      isFwShift
        ? pitchCenter + notesInPerfectFifth
        : pitchCenter - notesInPerfectFifth
    );
  }

  relativeBrightnessShift(isFwShift) {
    const pitches = this.getAbsolutePitches();
    const newPitchCenter = isFwShift ? pitches[3] : pitches[4];

    return this.parallelShift(isFwShift, newPitchCenter);
  }
}

export default Mode;
