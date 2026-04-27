/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { modeProperties } from '../assets/data';

import getScaleNotes from '../logic/getScaleNotes';
import getChordList from '../logic/getChordList';
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
  private pitchCenter: number;
  private scaleNotes?: string;

  /**
   * Creates a new Mode object
   * @param {Array<Numbers>} pitches - a non-empty array of abstract pitches where the difference between
   *    elements corresponds to the distance between the pitches in half-steps. Elements in the array must
   *    be strictly increasing.
   * @param {Number} pitchCenter - a number representing a pitch class where 0 is c, 1 is c-sharp/d-flat, ... , 11 is b
   * @throws {Error} if the range of the pitch collection exceeds an octave
   */
  constructor(pitches: number[], pitchCenter: number = pitches[0]) {
    super(pitches);
    this.pitchCenter = octaveMod(pitchCenter);
  }

  fromCode(modeCode: string, pitchCenter: number): Mode {
    return new Mode(
      modeCode.split('').map((el) => parseInt(el, 16)),
      pitchCenter
    );
  }

  getAbsolutePitches(): number[] {
    return this.getAbstractPitches().map(
      (el) => octaveMod(this.pitchCenter) + el
    );
  }

  getPitchCenter(): number {
    return this.pitchCenter;
  }

  getAbsoluteModeCode(): string {
    return `${this.getAbstractModeCode()}//${this.getPitchCenter()}`;
  }

  getScaleNotes(): string[] {
    if (!this.scaleNotes) {
      this.scaleNotes = JSON.stringify(getScaleNotes(this));
    }

    return JSON.parse(this.scaleNotes) as string[];
  }

  getModeRoot(): string {
    return this.getScaleNotes()[0];
  }

  getModeName(): string {
    const modeCode = this.getAbstractModeCode();
    const modeMeta = modeProperties[modeCode];
    const name = `${this.getModeRoot()} ${modeMeta?.modeName ?? ''}`;

    return replaceSymbols(name);
  }

  getParentTonality(): string {
    return modeProperties[this.getAbstractModeCode()]?.parentTonality ?? '';
  }

  getSharpness(): number {
    return this.getAbstractPitches().reduce((acc, pitch) => acc + pitch);
  }

  getChordList() {
    return getChordList(this);
  }

  relativeShift(isFwShift: boolean): Mode {
    let pitches = this.getAbsolutePitches();

    if (isFwShift) {
      const next = pitches.shift();
      if (next === undefined) {
        return this;
      }
      pitches.push(next + notesInOctave);
    } else {
      const previous = pitches.pop();
      if (previous === undefined) {
        return this;
      }
      pitches.unshift(previous - notesInOctave);
    }

    return new Mode(pitches);
  }

  parallelShift(isFwShift: boolean, pitchCenter: number = this.getPitchCenter()): Mode {
    const modeCode = this.getAbstractModeCode();

    const code = isFwShift
      ? modeProperties[modeCode]?.nextMode
      : modeProperties[modeCode]?.previousMode;

    return code ? this.fromCode(code, pitchCenter) : this;
  }

  keyShift(isFwShift: boolean): Mode {
    const pitches = this.getAbsolutePitches();
    const pitchCenter = this.getPitchCenter();

    return new Mode(
      pitches,
      isFwShift
        ? pitchCenter + notesInPerfectFifth
        : pitchCenter - notesInPerfectFifth
    );
  }

  relativeBrightnessShift(isFwShift: boolean): Mode {
    const pitches = this.getAbsolutePitches();
    const newPitchCenter = isFwShift ? pitches[3] : pitches[4];

    return this.parallelShift(isFwShift, newPitchCenter);
  }
}

export default Mode;
