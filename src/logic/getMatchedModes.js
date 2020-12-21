import Mode from './Mode';
import Utilities from './Utilities';

function getOffsetPitches(mode, degreeOffset) {
  return mode
    .getAbstractPitches()
    .map((el) => Utilities.octaveMod(el + degreeOffset))
    .sort((a, b) => a - b);
}

function matchMode(tonalityCollection, baseMode, scaleDegree) {
  const tonalityPitches = tonalityCollection.getAbstractPitches();
  const degreeOffset = tonalityPitches[scaleDegree];
  const offsetModePitches = getOffsetPitches(baseMode, degreeOffset);

  let modePitch = offsetModePitches.shift();

  for (let tonalityPitch of tonalityPitches) {
    if (tonalityPitch > modePitch) return null;
    if (tonalityPitch === modePitch) {
      if (offsetModePitches.length) {
        modePitch = offsetModePitches.shift();
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

function getMatchedModes(tonalityCollection, baseMode) {
  return Array.from(Array(tonalityCollection.getNoteQuantity()), (el, i) =>
    matchMode(tonalityCollection, baseMode, i)
  ).filter((el) => el !== null);
}

export default getMatchedModes;
