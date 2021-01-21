/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import Mode from '../Mode';

describe('Testing getAbsolutePitches', () => {
  test('returns the correct zeroed array when pitchCenter is 0', () => {
    let testCase = new Mode([0, 1, 3, 5]);
    let expectedOutput = [0, 1, 3, 5];
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  });

  test('returns the correct array offset by the pitchCenter value', () => {
    let testCase = new Mode([0, 1, 3, 5], 1);
    let expectedOutput = [1, 2, 4, 6];
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  });

  test('returns the correct array offset by the pitchCenter value, but by no more than an octave', () => {
    let testCase = new Mode([0, 1, 3, 5], 14);
    let expectedOutput = [2, 3, 5, 7];
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  });

  test('returns an array that is safe from rep exposure', () => {
    let inputArray = [0, 1, 3, 5];
    let testCase = new Mode(inputArray);
    let expectedOutput = [0, 1, 3, 5];
    inputArray.push(7);
    testCase.getAbsolutePitches().push(9);
    expect(testCase.getAbsolutePitches()).toStrictEqual(expectedOutput);
  });
});

describe('Testing getPitchCenter', () => {
  test('returns the original pitchCenter value when it is in the range of the center octave', () => {
    let testCase = new Mode([0, 1, 3, 5], 2);
    let expectedOutput = 2;
    expect(testCase.getPitchCenter()).toBe(expectedOutput);
  });

  test('returns the correct pitchCenter value when modulated to the center octave', () => {
    let testCase = new Mode([0, 1, 3, 5], -2);
    let expectedOutput = 10;
    expect(testCase.getPitchCenter()).toBe(expectedOutput);
  });
});

describe('Testing getAbsoluteModeCode', () => {
  test('returns the correct string representation of the absolute pitches in the mode', () => {
    let testCase = new Mode([0, 2, 4, 5, 7, 9, 11], 1);
    expect(testCase.getAbsoluteModeCode()).toBe('024579b//1');
  });
});
