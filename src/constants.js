/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

export const DROP_DOWN_STATE = {
  NONE: 'NONE',
  OPTIONS: 'OPTIONS',
  MENU: 'MENU',
};

export const SUPPORTED_CLEFS = {
  TREBLE: 'treble',
  ALTO: 'alto',
  BASS: 'bass',
};

export const SUPPORTED_TONALITIES = [
  { name: 'Whole-Tone', pitches: [0, 2, 4, 6, 8, 10] },
  { name: 'Augmented', pitches: [0, 3, 4, 7, 8, 11] },
  { name: 'Major', pitches: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Melodic Minor', pitches: [0, 2, 3, 5, 7, 9, 11] },
  { name: 'Harmonic Minor', pitches: [0, 2, 3, 5, 7, 8, 11] },
  { name: 'Harmonic Major', pitches: [0, 2, 4, 5, 7, 8, 11] },
  { name: 'Diminished', pitches: [0, 1, 3, 4, 6, 7, 9, 10] },
];
