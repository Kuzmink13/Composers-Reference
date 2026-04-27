/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getMatchedModes from './getMatchedModes';
import { notesInOctave } from './utilities';

import PitchCollection from '../objects/PitchCollection';
import Mode from '../objects/Mode';

interface Tonality {
  name?: string;
  pitches: number[];
}

function getRelativeModes(mode: Mode): Mode[] {
  const offsets = mode.getAbsolutePitches();
  const output: Mode[] = [];

  offsets.forEach(() => {
    output.push(new Mode(offsets));
    const shifted = offsets.shift();
    if (shifted !== undefined) {
      offsets.push(shifted + notesInOctave);
    }
  });

  return output;
}

function duplicateFilter() {
  const seenModes: Record<string, boolean> = {};

  const checkSeen = (modeCode: string): boolean => {
    if (seenModes[modeCode]) return false;
    seenModes[modeCode] = true;
    return true;
  };

  return (mode: Mode): boolean => checkSeen(mode.getAbsoluteModeCode());
}

function getModesFromTonality(tonality: Tonality, pitchArray: number[]): Mode[] {
  const tonalitiyCollection = new PitchCollection(tonality.pitches);
  const baseMode = new Mode(pitchArray);

  return getMatchedModes(tonalitiyCollection, baseMode)
    .map((mode) => getRelativeModes(mode))
    .flat()
    .filter(duplicateFilter());
}

export default getModesFromTonality;
