import PitchCollection from '../PitchCollection';

describe('Testing constructor', () => {
  test(`throws error when range of input array exceeds octave`, () => {
    let testCase = () => new PitchCollection([0, 1, 3, 5, 13]);
    expect(testCase).toThrowError(
      'Range of PitchCollection exceeds an octave!'
    );
  });
});

describe('Testing getAbstractPitches', () => {
  test('returns an array equal to the orignal when the first element is 0', () => {
    let testCase = new PitchCollection([0, 1, 3, 5]);
    let expectedOutput = [0, 1, 3, 5];
    expect(testCase.getAbstractPitches()).toStrictEqual(expectedOutput);
  });

  test('returns an array where each element is zeroed by the first element', () => {
    let testCase = new PitchCollection([2, 3, 5, 7]);
    let expectedOutput = [0, 1, 3, 5];
    expect(testCase.getAbstractPitches()).toStrictEqual(expectedOutput);
  });

  test('returns an array that is safe from rep exposure', () => {
    let inputArray = [0, 1, 3, 5];
    let testCase = new PitchCollection(inputArray);
    let expectedOutput = [0, 1, 3, 5];
    inputArray.push(7);
    testCase.getAbstractPitches().push(9);
    expect(testCase.getAbstractPitches()).toStrictEqual(expectedOutput);
  });
});

describe('Testing getAbstractModeCode', () => {
  test('returns the correct string representation of the abstract pitches', () => {
    let testCase = new PitchCollection([0, 2, 4, 5, 7, 9, 11]);
    expect(testCase.getAbstractModeCode()).toBe('024579b');
  });
});

describe('Testing getNoteQuantity', () => {
  test('returns the length of the original array', () => {
    let testCase = new PitchCollection([0, 1, 3, 5]);
    let expectedOutput = 4;
    expect(testCase.getNoteQuantity()).toBe(expectedOutput);
  });
});
