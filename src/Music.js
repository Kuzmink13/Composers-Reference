import PitchCollection from './PitchCollection';
import Mode from './Mode';
import Utilities from './Utilities';

const {
  supportedScaleLengths,
  notesInOctave,
  tonalities,
  modeProperties,
  octaveMod,
} = Utilities;

/**
 * A class containing static methods for working with PitchCollection and Mode Objects
 */
class Music {
  /**
   * Generates a new mode object from a given pitch collection if all abstract pitch values in Mode align to the pitch
   *    collection with respect to a given starting point based on a given scale degree in this. The pitch center of
   *    the new Mode object will be relative to the pitch center of Mode offset by the interval dictated by the given
   *    scale degree
   * @param {PitchCollection} collection - a Pitch Collection Object
   * @param {Mode} mode - a Mode object
   * @param {Number} scaleDegree - the scale degree of the collection that the first pitch in mode should be matched to
   * @returns a new Mode object or false if a match is not made
   */
  static matchMode(collection, mode, scaleDegree = 0) {
    let basePitches = collection.getAbstractPitches();
    let offset = basePitches[scaleDegree];
    let modePitchesWithOffset = mode
      .getAbstractPitches()
      .map((el) => octaveMod(el + offset))
      .sort((a, b) => a - b);
    let currentPitch = modePitchesWithOffset.shift();

    for (let el of basePitches) {
      if (el === currentPitch) {
        if (!modePitchesWithOffset.length)
          return new Mode(basePitches, mode.getPitchCenter() - offset);
        currentPitch = modePitchesWithOffset.shift();
      } else if (el > currentPitch) return false;
    }

    return false;
  }

  /**
   * Generates an array of all Modes generated by calling matchMode on a Mode object and incrementing through all scale
   *    degrees in a given PitchCollection
   * @param {PitchCollection} collection - a PitchCollection object
   * @param {Mode} mode - a Mode object
   * @returns {Array<Mode>} - an array of new Mode objects that match the provided pitch collection
   */
  static matchAll(collection, mode) {
    let modeList = [];

    collection.getAbstractPitches().forEach((el, i) => {
      let match = Music.matchMode(collection, mode, i);
      if (match) modeList.push(match);
    });

    return modeList;
  }

  /**
   * Generates a list of Modes relative to and including the given mode
   * @param {Mode} mode - a Mode object
   * @returns {Array<Mode>} - an array of new Mode objects that correspond to all the relative modes of this
   */
  static getRelatives(mode) {
    let offsets = mode.getAbsolutePitches();
    let output = [];

    offsets.forEach((el, i) => {
      output.push(new Mode(offsets, offsets[0]));
      offsets.push(offsets.shift() + notesInOctave);
    });

    return output;
  }

  /**
   * Filters a list of mode objects to include only modes that have a given pitch as their pitch center
   * @param {Array[Modes]} modes - an array of Mode objects
   * @param {Number} pitch - a number represting a pitch to filter the list by
   * @returns {Array[Modes]} - a new array object containing only the filtered modes
   */
  static filterModes(modes, pitchCenter) {
    let output = [];

    modes.forEach((el) => {
      if (el.getPitchCenter() === pitchCenter) output.push(el);
    });

    return output;
  }

  /**
   * Filters out duplicate mode objects from a list of mode objects
   * @param {Array[Modes]} modes - an array of Mode objects
   * @returns {Array[Modes]} - a new array object containing each unique mode provided
   */
  static removeDuplicates(modes) {
    let unique = new Set();

    return modes.filter((el) => {
      let code = el.getAbsoluteModeCode();
      if (unique.has(code)) return false;
      else {
        unique.add(code);
        return true;
      }
    });
  }

  /**
   * Generates all concrete modes of the pitch collection that match the given pitches.
   * @param {Array[Numbers]} collectionPitches - a non-empty array of abstract pitches where the difference between
   *    elements corresponds to the distance between the pitches in half-steps. Elements in the array must
   *    be strictly increasing.
   * @param {Array[Numbers]} givenPitches - a non-empty array of absolute pitches where each element is a number
   *    representing a pitch class where 0 is c, 1 is c-sharp/d-flat, ... , 11 is b . Elements in the array must
   *    be strictly increasing.
   * @param {Number} pitchCenter - (optional) a value corresponding to a pitch class that is defined the pitch Center
   *    of this tonality. If provided, output will only include modes that have this value as their pitch center
   * @returns {Array[Modes]} - an array of unique Mode objects generated by matching the given pitches to the pitch
   *    collection and producing the resulting relative modes
   */
  static generateModes(
    collectionPitches,
    givenPitches,
    pitchCenter = undefined
  ) {
    let collection = new PitchCollection(collectionPitches);
    let given = new Mode(givenPitches, givenPitches[0]);
    let matches = Music.matchAll(collection, given);
    let allModes = [];

    matches.forEach((el) =>
      Music.getRelatives(el).forEach((el) => allModes.push(el))
    );

    return pitchCenter === undefined
      ? this.removeDuplicates(allModes)
      : this.removeDuplicates(this.filterModes(allModes, pitchCenter));
  }

  /**
   * Converts a boolean based array of pitches to index-based
   * @param {Array[Boolean]} pitchArray - an array of boolean values that indicate whether a given index is included
   *    in the collection of pitches
   * @returns {Array[Boolean]} - an array of abstract pitches where the difference between elements corresponds to the
   *    distance between the pitches in half-steps.
   */
  static buildScaleArray(pitchArray) {
    return pitchArray
      .map((el, i) => (el ? i : null))
      .filter((el) => el != null);
  }

  /**
   * Generates all concrete modes of all supported tonalities that match the given pitches.
   * @param {Array[Numbers]} givenPitches - a non-empty array of absolute pitches where each element is a number
   *    representing a pitch class where 0 is c, 1 is c-sharp/d-flat, ... , 11 is b . Elements in the array must
   *    be strictly increasing.
   * @param {Number} pitchCenter - (optional) a value corresponding to a pitch class that is defined the pitch Center
   *    of this tonality. If provided, output will only include modes that have this value as their pitch center
   * @returns {Array[Modes]} - an array of unique Mode objects generated by matching the given pitches to each of the
   *    supported tonalities. Array is sorted by: 1. tonality, 2. root in given notes, 3. by note, 4. by mode brightness
   */
  static generateAllModes(givenPitches, pitchCenter, selectedTonalities) {
    let output = [];
    tonalities
      .filter((el, i) => selectedTonalities[i])
      .forEach((el) => {
        output = output.concat(
          this.generateModes(el.pitches, givenPitches, pitchCenter).sort(
            (a, b) => {
              const aRoot = a.getPitchCenter();
              const bRoot = b.getPitchCenter();

              if (
                givenPitches.includes(aRoot) !== givenPitches.includes(bRoot)
              ) {
                return givenPitches.includes(aRoot) ? -1 : 1;
              } else if (aRoot !== bRoot) {
                return aRoot - bRoot;
              } else {
                return (
                  modeProperties[a.getAbstractModeCode()].modeNumber -
                  modeProperties[b.getAbstractModeCode()].modeNumber
                );
              }
            }
          )
        );
      });

    return output;
  }

  static getFilterdLists(
    isNoteSelected,
    root,
    selectedTonalities,
    isFilteredBySelection
  ) {
    const filterByQuantity = (noteQuantity) =>
      modes.filter((mode) => mode.getNoteQuantity() === noteQuantity);

    const filterBySelected = () =>
      (modes = modes.filter((mode) => isNoteSelected[mode.getPitchCenter()]));

    let modes = this.generateAllModes(
      this.buildScaleArray(isNoteSelected),
      root,
      selectedTonalities
    );

    isFilteredBySelection && filterBySelected();

    return supportedScaleLengths.map((quantity) => filterByQuantity(quantity));
  }
}

export default Music;
