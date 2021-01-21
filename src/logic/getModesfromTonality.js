/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getMatchedModes from './getMatchedModes';
import { notesInOctave } from './utilities';

import PitchCollection from '../objects/PitchCollection';
import Mode from '../objects/Mode';

function getRelativeModes(mode) {
  const offsets = mode.getAbsolutePitches();
  const output = [];

  offsets.forEach(() => {
    output.push(new Mode(offsets));
    offsets.push(offsets.shift() + notesInOctave);
  });

  return output;
}

function rootFilter(root) {
  return (mode) => root === undefined || root === mode.getPitchCenter();
}

function duplicateFilter() {
  const seenModes = {};

  const checkSeen = (modeCode) => {
    if (seenModes[modeCode]) return false;
    seenModes[modeCode] = true;
    return true;
  };

  return (mode) => checkSeen(mode.getAbsoluteModeCode());
}

function getModesFromTonality(tonality, pitchArray, root) {
  const tonalitiyCollection = new PitchCollection(tonality.pitches);
  const baseMode = new Mode(pitchArray);

  return getMatchedModes(tonalitiyCollection, baseMode)
    .map((mode) => getRelativeModes(mode))
    .flat()
    .filter(duplicateFilter())
    .filter(rootFilter(root));
}

export default getModesFromTonality;
