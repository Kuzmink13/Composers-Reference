/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

const jsMusicSymbols = [
  { regex: /##/g, replacement: '\uD834\uDD2A' },
  { regex: /bb/g, replacement: '\uD834\uDD2B' },
  { regex: /#/g, replacement: '\u266F' },
  { regex: /b/g, replacement: '\u266D' },
  { regex: /nat/g, replacement: '\u266E' },
  { regex: /dim/g, replacement: '\uD834\uDDC8' },
];

export const notesInOctave = 12;

export const notesInPerfectFifth = 7;

export function octaveMod(pitch) {
  return ((pitch % notesInOctave) + notesInOctave) % notesInOctave;
}

export function replaceSymbols(str) {
  return jsMusicSymbols.reduce(
    (acc, symbol) => acc.replace(symbol.regex, symbol.replacement),
    str
  );
}
