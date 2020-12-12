import Music from '../Music';
import PitchCollection from '../PitchCollection';
import Mode from '../Mode';

describe('Testing matchMode', () => {
  test('returns false if there is no match', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 6], [0, 1], 0];
    let testCase = Music.matchMode(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    expect(testCase).toBe(false);
  });

  test('returns false if there is no match after offset', () => {
    let [pitches, mode, pitchCenter, scaleDegree] = [
      [0, 2, 3, 6],
      [0, 3],
      0,
      1,
    ];
    let testCase = Music.matchMode(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter),
      scaleDegree
    );
    expect(testCase).toBe(false);
  });

  test('returns correct Mode object if there is a match', () => {
    let [pitches, mode, pitchCenter, pitchCenterAdj] = [
      [0, 2, 3, 6],
      [0, 3],
      0,
      0,
    ];
    let testCase = Music.matchMode(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    let output = new Mode(pitches, pitchCenter + pitchCenterAdj);
    expect(testCase.getAbstractPitches()).toStrictEqual(
      output.getAbstractPitches()
    );
    expect(testCase.getAbsolutePitches()).toStrictEqual(
      output.getAbsolutePitches()
    );
    expect(testCase.getNoteQuantity()).toBe(output.getNoteQuantity());
    expect(testCase.getPitchCenter()).toBe(output.getPitchCenter());
  });

  test('returns correct Mode object if there is a match with non-zero pitch center', () => {
    let [pitches, mode, pitchCenter, pitchCenterAdj] = [
      [0, 2, 3, 6],
      [0, 3],
      1,
      0,
    ];
    let testCase = Music.matchMode(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    let output = new Mode(pitches, pitchCenter + pitchCenterAdj);
    expect(testCase.getAbstractPitches()).toStrictEqual(
      output.getAbstractPitches()
    );
    expect(testCase.getAbsolutePitches()).toStrictEqual(
      output.getAbsolutePitches()
    );
    expect(testCase.getNoteQuantity()).toBe(output.getNoteQuantity());
    expect(testCase.getPitchCenter()).toBe(output.getPitchCenter());
  });

  test('returns correct Mode object if there is a match after offset', () => {
    let [pitches, mode, pitchCenter, pitchCenterAdj, scaleDegree] = [
      [0, 2, 3, 6],
      [0, 3],
      0,
      -3,
      2,
    ];
    let testCase = Music.matchMode(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter),
      scaleDegree
    );
    let output = new Mode(pitches, pitchCenter + pitchCenterAdj);
    expect(testCase.getAbstractPitches()).toStrictEqual(
      output.getAbstractPitches()
    );
    expect(testCase.getAbsolutePitches()).toStrictEqual(
      output.getAbsolutePitches()
    );
    expect(testCase.getNoteQuantity()).toBe(output.getNoteQuantity());
    expect(testCase.getPitchCenter()).toBe(output.getPitchCenter());
  });
});

describe('Testing matchAll', () => {
  test('returns an empty array if there are no possible mathces', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 5], [0, 4], 0];
    let testCase = Music.matchAll(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    expect(testCase).toStrictEqual([]);
  });

  test('returns an array containing all possible Modes geterated by matchMode', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 5], [0, 3], 0];
    let testCase = Music.matchAll(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    let outputPitchCenters = [0, 10];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(pitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    });
  });

  test('returns an array containing all possible Modes geterated by matchMode with pitch center offset', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 5], [0, 3], 1];
    let testCase = Music.matchAll(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    let outputPitchCenters = [1, 11];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(pitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    });
  });

  test('returns an array containing all possible Modes geterated by matchMode even when crossing the octave', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 4, 5, 7, 9, 11], [0, 3, 7], 0];
    let testCase = Music.matchAll(
      new PitchCollection(pitches),
      new Mode(mode, pitchCenter)
    );
    let outputPitchCenters = [10, 8, 3];

    expect(testCase.length).toBe(3);
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(pitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    });
  });
});

describe('Testing getRelatives', () => {
  test('returns all relative modes for a given Mode object', () => {
    let testCase = Music.getRelatives(new Mode([0, 1, 3], 0));
    let outputList = [
      [0, 1, 3],
      [1, 3, 12],
      [3, 12, 13],
    ];

    expect(testCase.length).toBe(3);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(outputList[i]);
    });
  });
});

describe('Testing filterModes', () => {
  test('returns empty array when no modes match the given pitch center', () => {
    let modes = [
      new Mode([0, 1, 3], 0),
      new Mode([0, 1, 3], 1),
      new Mode([0, 1, 4], 0),
    ];
    let testCase = Music.filterModes(modes, 2);
    expect(testCase).toStrictEqual([]);
  });

  test('returns all elements that match the given pitch center', () => {
    let modes = [
      new Mode([0, 1, 3], 0),
      new Mode([0, 1, 3], 1),
      new Mode([0, 1, 4], 0),
    ];
    let testCase = Music.filterModes(modes, 0);
    let output = [
      [0, 1, 3],
      [0, 1, 4],
    ];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    });
  });

  test('returns new array object', () => {
    let modes = [new Mode([0, 1, 3], 0), new Mode([0, 1, 4], 0)];
    let testCase = Music.filterModes(modes, 0);
    modes.push(new Mode([0, 1, 5], 6));
    expect(testCase.length).toBe(2);
  });
});

describe('Testing removeDuplicates', () => {
  test('returns an array that contains only unique modes', () => {
    let modes = [
      new Mode([0, 1, 3], 1),
      new Mode([1, 2, 4], 1),
      new Mode([0, 1, 4], 0),
    ];
    let testCase = Music.removeDuplicates(modes);
    let output = [
      [1, 2, 4],
      [0, 1, 4],
    ];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    });
  });

  test('returns a new array object', () => {
    let modes = [new Mode([0, 1, 3], 0), new Mode([0, 1, 4], 0)];
    let testCase = Music.removeDuplicates(modes);
    modes.push(new Mode([0, 1, 5], 6));
    expect(testCase.length).toBe(2);
  });
});

describe('Testing generateModes', () => {
  test('returns all concrete modes of the pitch collection - not filtered', () => {
    let [collectionPithces, modePitches] = [
      [0, 3, 4, 7],
      [1, 4],
    ];
    let output = [
      [1, 4, 5, 8],
      [4, 5, 8, 13],
      [5, 8, 13, 16],
      [8, 13, 16, 17],
      [9, 12, 13, 16],
      [0, 1, 4, 9],
      [1, 4, 9, 12],
      [4, 9, 12, 13],
    ];
    let testCase = Music.generateModes(collectionPithces, modePitches);

    expect(testCase.length).toBe(8);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    });
  });

  test('returns all concrete modes of the pitch collection - filtered', () => {
    let [collectionPithces, modePitches, pitchCenter] = [
      [0, 3, 4, 7],
      [1, 4],
      1,
    ];
    let output = [
      [1, 4, 5, 8],
      [1, 4, 9, 12],
    ];
    let testCase = Music.generateModes(
      collectionPithces,
      modePitches,
      pitchCenter
    );

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    });
  });
});
