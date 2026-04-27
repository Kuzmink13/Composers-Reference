/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { notesInOctave } from '../logic/utilities';

/**
 * A collection of successive pitches contained within an octave
 */
class PitchCollection {
  protected pitches: string;

  /**
   * Creates a new PitchCollection object
   * @param {Array<Numbers>} pitches - a non-empty array of abstract pitches where the difference between
   *    elements corresponds to the distance between the pitches in half-steps. Elements in the array must
   *    be strictly increasing.
   * @throws {Error} if the range of the pitch collection exceeds an octave
   */
  constructor(pitches: number[]) {
    const minimizedPitches = pitches.map((el, i, arr) => el - arr[0]);

    if (minimizedPitches[minimizedPitches.length - 1] >= notesInOctave)
      throw new Error('Range of PitchCollection exceeds an octave!');

    this.pitches = JSON.stringify(minimizedPitches);
  }

  getAbstractPitches(): number[] {
    return JSON.parse(this.pitches) as number[];
  }

  getAbstractModeCode(): string {
    return this.getAbstractPitches()
      .map((el) => el.toString(notesInOctave))
      .join('');
  }

  getNoteQuantity(): number {
    return this.getAbstractPitches().length;
  }
}

export default PitchCollection;
