/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { octaveMod } from '../utilities';

describe('Testing OctaveMod', () => {
  test('returns the input modulus 12', () => {
    expect(octaveMod(3)).toBe(3);
    expect(octaveMod(13)).toBe(1);
    expect(octaveMod(-2)).toBe(10);
    expect(octaveMod(26)).toBe(2);
    expect(octaveMod(-13)).toBe(11);
  });
});
