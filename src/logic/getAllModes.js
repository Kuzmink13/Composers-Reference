/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { SUPPORTED_TONALITIES } from '../constants';

import getModesFromTonality from './getModesfromTonality';

function modeCompare(pitchArray) {
  return (a, b) => {
    const aRoot = a.getPitchCenter();
    const bRoot = b.getPitchCenter();

    // BY ARRAY INCLUSION
    if (pitchArray.includes(aRoot) !== pitchArray.includes(bRoot)) {
      return -Number(pitchArray.includes(aRoot));
    }
    // BY ABSOLUTE ROOT ORDER
    else if (aRoot !== bRoot) {
      return aRoot - bRoot;
      // TODO change to relative root order starting from first selected pitch
    }
    // BY MODE PRIORITY
    else {
      return b.getSharpness() - a.getSharpness();
    }
  };
}

function getAllModes(pitchArray) {
  return SUPPORTED_TONALITIES.map((tonality) =>
    getModesFromTonality(tonality, pitchArray).sort(modeCompare(pitchArray))
  ).flat();
}

export default getAllModes;
