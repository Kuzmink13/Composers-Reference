/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { octaveMod } from './utilities';

import Mode from '../objects/Mode';
import type PitchCollection from '../objects/PitchCollection';

function getOffsetPitches(mode: Mode, degreeOffset: number): number[] {
  return mode
    .getAbstractPitches()
    .map((el) => octaveMod(el + degreeOffset))
    .sort((a, b) => a - b);
}

function matchMode(
  tonalityCollection: PitchCollection,
  baseMode: Mode,
  scaleDegree: number
): Mode | null {
  const tonalityPitches = tonalityCollection.getAbstractPitches();
  const degreeOffset = tonalityPitches[scaleDegree];
  const offsetModePitches = getOffsetPitches(baseMode, degreeOffset);

  let modePitch = offsetModePitches.shift();
  if (modePitch === undefined) {
    return null;
  }

  for (let tonalityPitch of tonalityPitches) {
    if (tonalityPitch > modePitch) return null;
    if (tonalityPitch === modePitch) {
      if (offsetModePitches.length) {
        modePitch = offsetModePitches.shift() as number;
        continue;
      }
      return new Mode(
        tonalityPitches,
        baseMode.getPitchCenter() - degreeOffset
      );
    }
  }

  return null;
}

function getMatchedModes(
  tonalityCollection: PitchCollection,
  baseMode: Mode
): Mode[] {
  return Array.from(Array(tonalityCollection.getNoteQuantity()), (el, i) =>
    matchMode(tonalityCollection, baseMode, i)
  ).filter((el): el is Mode => el !== null);
}

export default getMatchedModes;
