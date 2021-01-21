/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getChordList from '../getChordList';
import Mode from '../../objects/Mode';

const toNames = (el) => el.chordName;

describe('testing chord generation', () => {
  test('expected list to contain all correct chords', () => {
    const testCase = getChordList(new Mode([0, 2, 4, 5, 7, 9, 11])).map(
      toNames
    );
    const outputNames = ['sus2', ' ', '6', '6/9', 'maj7', 'maj9', 'sus4'];

    expect(testCase).toHaveLength(7);

    outputNames.forEach((name) => expect(testCase).toContain(name));
  });

  test('expected list in correct order', () => {
    const testCase = getChordList(new Mode([0, 2, 4, 5, 7, 9, 11])).map(
      toNames
    );
    const outputNames = [' ', 'maj7', '6', 'maj9', '6/9', 'sus2', 'sus4'];

    expect(testCase).toStrictEqual(outputNames);
  });
});
