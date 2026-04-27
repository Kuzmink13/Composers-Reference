/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { notes } from '../assets/data';
import type { NoteInfo } from '../assets/data';
import { octaveMod } from './utilities';
import type Mode from '../objects/Mode';

export const letterNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export const supportedScaleLengths = [6, 7, 8];

export const accidentals = {
  sharp: '#',
  flat: 'b',
};

export const oneLetterWholeSteps: Record<string, string> = {
  Cb: 'C#',
  Db: 'D#',
  Eb: 'E#',
  Fb: 'F#',
  Gb: 'G#',
  Ab: 'A#',
  Bb: 'B#',
};

export function getKey(pitch: number): NoteInfo {
  return notes[octaveMod(pitch)];
}

export function getEnharmonics(pitch: number): Record<string, string> {
  return notes[octaveMod(pitch)].enharmonics;
}

export function getShortestOrDefault(pitch: number, isSharp: boolean): string {
  const key = getKey(pitch);
  const sharp = key.sharpName;
  const flat = key.flatName;

  switch (true) {
    case sharp.length < flat.length:
      return sharp;
    case flat.length < sharp.length:
      return flat;
    default:
      return isSharp ? sharp : flat;
  }
}

export function hasAccidental(
  scale: Array<string | undefined>,
  accidental: string
): boolean {
  return scale.reduce(
    (acc, note) => acc || (typeof note === 'string' && note.includes(accidental)),
    false
  );
}

export function hasBothAccidentals(scale: Array<string | undefined>): boolean {
  return (
    hasAccidental(scale, accidentals.sharp) &&
    hasAccidental(scale, accidentals.flat)
  );
}

export function getLetterSequence(mode: Mode, isSharp: boolean): string[] {
  const key = getKey(mode.getPitchCenter());
  const letterName = (isSharp ? key.sharpName : key.flatName)[0];
  const index = letterNames.indexOf(letterName);
  return letterNames.slice(index).concat(letterNames.slice(0, index));
}

export function isWholeStep(pitches: number[], i: number): boolean {
  return pitches[i + 1] - pitches[i] === 2;
}

export function isValid(scale: Array<string | undefined>): string[] | false {
  return scale.includes(undefined) ? false : (scale as string[]);
}
