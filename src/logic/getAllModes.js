import { supportedTonalities } from '../hooks/useTonalities';

import getModesFromTonality from './getModesfromTonality';
import Utilities from './Utilities';

const { modeProperties } = Utilities;

function tonalityFilter(tonalities) {
  return (el, i) => tonalities[i];
}

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
      return (
        modeProperties[a.getAbstractModeCode()].modeNumber -
        modeProperties[b.getAbstractModeCode()].modeNumber
        // TODO mode properties should only be accessed thru mode object
      );
    }
  };
}

function getAllModes(pitchArray, root, tonalities) {
  return supportedTonalities
    .filter(tonalityFilter(tonalities))
    .map((tonality) =>
      getModesFromTonality(tonality, pitchArray, root).sort(
        modeCompare(pitchArray)
      )
    )
    .flat();
}

export default getAllModes;
