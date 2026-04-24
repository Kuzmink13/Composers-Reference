/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { notesInOctave } from '../logic/utilities';

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
    const minimizedPitches = pitches.map((el, i, arr) => el - arr[0]);

    if (minimizedPitches.slice(-1) >= notesInOctave)
      throw new Error('Range of PitchCollection exceeds an octave!');

    this.pitches = JSON.stringify(minimizedPitches);
  }

  getAbstractPitches() {
    return JSON.parse(this.pitches);
  }

  getAbstractModeCode() {
    return this.getAbstractPitches()
      .map((el) => el.toString(notesInOctave))
      .join('');
  }

  getNoteQuantity() {
    return this.getAbstractPitches().length;
  }
}

export default PitchCollection;
