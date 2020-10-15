const { test, expect } = require("@jest/globals")
const music = require("../src/PitchCollection")

let PitchCollection = music.PitchCollection;
let Mode = music.Mode;

describe('Testing Class: PitchCollection', () => {

  test(`constructor throws error when range of input array exceeds octave`, () => {
    let testCase = () => new PitchCollection([0, 1, 3, 5, 13]);
    expect(testCase).toThrowError("Range of PitchCollection exceeds an octave!");
  })

  test('getAbstractPitches returns an array equal to the orignal when the first element is 0', () => {
    let testCase = new PitchCollection([0, 1, 3, 5]);
    let expectedOutput = [0, 1, 3, 5];
    expect(testCase.getAbstractPitches()).toStrictEqual(expectedOutput);
  })

  test('getAbstractPitches returns an array where each element is zeroed by the first element', () => {
    let testCase = new PitchCollection([2, 3, 5, 7]);
    let expectedOutput = [0, 1, 3, 5];
    expect(testCase.getAbstractPitches()).toStrictEqual(expectedOutput);
  })

  test('getAbstractPitches returns an array that is safe from rep exposure', () => {
    let inputArray = [0, 1, 3, 5];
    let testCase = new PitchCollection(inputArray);
    let expectedOutput = [0, 1, 3, 5];
    inputArray.push(7);
    testCase.getAbstractPitches().push(9);
    expect(testCase.getAbstractPitches()).toStrictEqual(expectedOutput);
  })

  test('getNoteQuatity returns the length of the original array', () => {
    let testCase = new PitchCollection([0, 1, 3, 5]);
    let expectedOutput = 4;
    expect(testCase.getNoteQuantity()).toBe(expectedOutput);
  })

  test('createMode returns a Mode object with the correct properties', () => {
    let [pitches, pitchCenter] = [[1, 2, 4, 6], -3];
    let testCase = (new PitchCollection(pitches)).createMode(pitchCenter);
    let output = new Mode(pitches, pitchCenter);
    expect(testCase.getAbstractPitches()).toStrictEqual(output.getAbstractPitches());
    expect(testCase.getAbsolutePitches()).toStrictEqual(output.getAbsolutePitches());
    expect(testCase.getNoteQuantity()).toBe(output.getNoteQuantity());
    expect(testCase.getPitchCenter()).toBe(output.getPitchCenter());
  })

  test('matchMode returns false if there is no match', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 6], [0, 1], 0];
    let testCase = (new PitchCollection(pitches)).matchMode(new Mode(mode, pitchCenter));
    expect(testCase).toBe(false);
  })

  test('matchMode returns false if there is no match after offset', () => {
    let [pitches, mode, pitchCenter, scaleDegree] = [[0, 2, 3, 6], [0, 3], 0, 1];
    let testCase = (new PitchCollection(pitches)).matchMode(new Mode(mode, pitchCenter), scaleDegree);
    expect(testCase).toBe(false);
  })

  test('matchMode returns correct Mode object if there is a match', () => {
    let [pitches, mode, pitchCenter, pitchCenterAdj] = [[0, 2, 3, 6], [0, 3], 0, 0];
    let testCase = (new PitchCollection(pitches)).matchMode(new Mode(mode, pitchCenter));
    let output = new Mode(pitches, pitchCenterAdj);
    expect(testCase.getAbstractPitches()).toStrictEqual(output.getAbstractPitches());
    expect(testCase.getAbsolutePitches()).toStrictEqual(output.getAbsolutePitches());
    expect(testCase.getNoteQuantity()).toBe(output.getNoteQuantity());
    expect(testCase.getPitchCenter()).toBe(output.getPitchCenter());
  })

  test('matchMode returns correct Mode object if there is a match after offset', () => {
    let [pitches, mode, pitchCenter, pitchCenterAdj, scaleDegree] = [[0, 2, 3, 6], [0, 3], 0, -3, 2];
    let testCase = (new PitchCollection(pitches)).matchMode(new Mode(mode, pitchCenter), scaleDegree);
    let output = new Mode(pitches, pitchCenterAdj);
    expect(testCase.getAbstractPitches()).toStrictEqual(output.getAbstractPitches());
    expect(testCase.getAbsolutePitches()).toStrictEqual(output.getAbsolutePitches());
    expect(testCase.getNoteQuantity()).toBe(output.getNoteQuantity());
    expect(testCase.getPitchCenter()).toBe(output.getPitchCenter());
  })

  test('matchAll should return an empty array if there are no possible mathces', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 5], [0, 4], 0];
    let testCase = (new PitchCollection(pitches)).matchAll(new Mode(mode, pitchCenter));
    expect(testCase).toStrictEqual([]);
  })

  test('matchAll should return an array containing all possible Modes geterated by matchMode', () => {
    let [pitches, mode, pitchCenter] = [[0, 2, 3, 5], [0, 3], 0];
    let testCase = (new PitchCollection(pitches)).matchAll(new Mode(mode, pitchCenter));
    let outputPitchCenters = [0, 10]
    testCase.forEach((el, i) => {
      expect(el.getAbstractPitches()).toStrictEqual(pitches);
      expect(el.getPitchCenter()).toBe(outputPitchCenters[i]);
    })
  })  
})

describe('Testing Class: Mode', () => {
  
  test('getAbsolutePitches returns the correct zeroed array when pitchCenter is 0', () => {
    let testCase = new Mode([0, 1, 3, 5], 0);
    let expectedOutput = [0, 1, 3, 5];
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  })

  test('getAbsolutePitches returns the correct array offset by the pitchCenter value', () => {
    let testCase = new Mode([0, 1, 3, 5], 1);
    let expectedOutput = [1, 2, 4, 6];
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  })

  test('getAbsolutePitches returns the correct array offset by the pitchCenter value, but by no more than an octave', () => {
    let testCase = new Mode([0, 1, 3, 5], 14);
    let expectedOutput = [2, 3, 5, 7];
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  })

  test('getAbsolutePitches returns an array that is safe from rep exposure', () => {
    let inputArray = [0, 1, 3, 5];
    let testCase = new Mode(inputArray, 0);
    let expectedOutput = [0, 1, 3, 5];
    inputArray.push(7);
    testCase.getAbsolutePitches().push(9);
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  })

  test('getPitchCenter returns the original pitchCenter value when it is in the range of the center octave', () => {
    let testCase = new Mode([0, 1, 3, 5], 2);
    let expectedOutput = 2;
    expect(testCase.getPitchCenter()).toBe(expectedOutput);
  })

  test('getPitchCenter returns the correct pitchCenter value when modulated to the center octave', () => {
    let testCase = new Mode([0, 1, 3, 5], -2);
    let expectedOutput = 10;
    expect(testCase.getPitchCenter()).toBe(expectedOutput);
  })

  test('getRelatives returns all relative modes for a given Mode object', () => {
    let testCase = (new Mode([0, 1, 3], 0)).getRelatives();
    let outputList = [[0, 1, 3], [1, 3, 12], [3, 12, 13]];
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(outputList[i]);
    })
  })
})