import getMatchedModes from '../getMatchedModes';
import PitchCollection from '../PitchCollection';
import Mode from '../Mode';

describe('Testing getMatchedModes', () => {
  test('returns an empty array if there are no possible mathces', () => {
    const input = {
      collectionPitches: [0, 2, 3, 5],
      modePitches: [0, 4],
    };

    let testCase = getMatchedModes(
      new PitchCollection(input.collectionPitches),
      new Mode(input.modePitches)
    );

    expect(testCase).toStrictEqual([]);
  });

  test('returns an array containing all possible Modes geterated by matchMode', () => {
    const input = {
      collectionPitches: [0, 2, 3, 5],
      modePitches: [0, 3],
    };

    let testCase = getMatchedModes(
      new PitchCollection(input.collectionPitches),
      new Mode(input.modePitches)
    );

    let outputPitchCenters = [0, 10];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(input.collectionPitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    });
  });

  test('returns an array containing all possible Modes geterated by matchMode with pitch center offset', () => {
    const input = {
      collectionPitches: [0, 2, 3, 5],
      modePitches: [0, 3],
      modePitchCenter: 1,
    };

    let testCase = getMatchedModes(
      new PitchCollection(input.collectionPitches),
      new Mode(input.modePitches, input.modePitchCenter)
    );

    let outputPitchCenters = [1, 11];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(input.collectionPitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    });
  });

  test('returns an array containing all possible Modes geterated by matchMode even when crossing the octave', () => {
    const input = {
      collectionPitches: [0, 2, 4, 5, 7, 9, 11],
      modePitches: [0, 3, 7],
    };

    let testCase = getMatchedModes(
      new PitchCollection(input.collectionPitches),
      new Mode(input.modePitches)
    );

    let outputPitchCenters = [10, 8, 3];

    expect(testCase.length).toBe(3);
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(input.collectionPitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    });
  });
});
