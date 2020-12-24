import getScaleNotes from '../getScaleNotes';

import Mode from '../../objects/Mode';

describe('Testing six note scales', () => {
  test('returns correct scale when there are no accidentals', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 4, 5, 7, 9]));

    expect(testCase).toStrictEqual(['C', 'D', 'E', 'F', 'G', 'A']);
  });

  test('enharmonics default to sharp', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 4, 5, 8, 10]));

    expect(testCase).toStrictEqual(['C', 'D', 'E', 'F', 'G#', 'A#']);
  });

  test('scale does not repeat letter names', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 3, 5, 7, 9]));

    expect(testCase).toStrictEqual(['C', 'D', 'Eb', 'F', 'G', 'A']);
  });

  test('selects one accidental type if lengths are the same', () => {
    const testCase = getScaleNotes(new Mode([4, 6, 8, 10, 12, 13]));

    expect(testCase).toStrictEqual(['E', 'Gb', 'Ab', 'Bb', 'C', 'Db']);
  });

  test('will display multiple accidentals types if necessary', () => {
    const testCase = getScaleNotes(new Mode([0, 3, 4, 7, 8, 11]));

    expect(testCase).toStrictEqual(['C', 'D#', 'E', 'G', 'Ab', 'B']);
  });
});

describe('Testing seven note scales', () => {
  test('returns correct scale when there are no accidentals', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 4, 5, 7, 9, 11]));

    expect(testCase).toStrictEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
  });

  test('enharmonics default to sharp', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 4, 5, 8, 9, 11]));

    expect(testCase).toStrictEqual(['C', 'D', 'E', 'F', 'G#', 'A', 'B']);
  });

  test('scale will not repeat letter names', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 3, 5, 7, 9, 11]));

    expect(testCase).toStrictEqual(['C', 'D', 'Eb', 'F', 'G', 'A', 'B']);
  });

  test('scale will not skip letter names', () => {
    const testCase = getScaleNotes(new Mode([0, 2, 3, 7, 8, 10, 11]));

    expect(testCase).toStrictEqual(['C', 'D', 'Eb', 'F##', 'G#', 'A#', 'B']);
  });

  test('shortest scale is selected', () => {
    const testCase = getScaleNotes(new Mode([11, 13, 15, 16, 18, 20, 22]));

    expect(testCase).toStrictEqual(['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#']);
  });
});

describe('Testing eight note scales', () => {
  test('repeats note over a whole step in the first possible spot', () => {
    const testCase = getScaleNotes(new Mode([0, 1, 3, 4, 5, 7, 9, 11]));

    expect(testCase).toStrictEqual(['C', 'Db', 'D#', 'E', 'F', 'G', 'A', 'B']);
  });
});
