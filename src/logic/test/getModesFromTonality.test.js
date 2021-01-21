/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getModesFromTonality from '../getModesfromTonality';

describe('Testing generateModes', () => {
  test('returns all concrete modes of the pitch collection - not filtered', () => {
    let input = {
      tonality: { pitches: [0, 3, 4, 7] },
      modePitches: [1, 4],
    };

    let testCase = getModesFromTonality(input.tonality, input.modePitches);

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

    expect(testCase.length).toBe(8);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    });
  });

  test('returns all concrete modes of the pitch collection - filtered', () => {
    let input = {
      tonality: { pitches: [0, 3, 4, 7] },
      modePitches: [1, 4],
      root: 1,
    };

    let testCase = getModesFromTonality(
      input.tonality,
      input.modePitches,
      input.root
    );

    let output = [
      [1, 4, 5, 8],
      [1, 4, 9, 12],
    ];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    });
  });
});
