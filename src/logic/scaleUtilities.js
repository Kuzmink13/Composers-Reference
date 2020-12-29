import * as notes from '../assets/notes.json';
import { octaveMod } from './utilities';

export const letterNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export const supportedScaleLengths = [6, 7, 8];

export const accidentals = {
  sharp: '#',
  flat: 'b',
};

export const oneLetterWholeSteps = {
  Cb: 'C#',
  Db: 'D#',
  Eb: 'E#',
  Fb: 'F#',
  Gb: 'G#',
  Ab: 'A#',
  Bb: 'B#',
};

export function getKey(pitch) {
  return notes.default[octaveMod(pitch)];
}

export function getEnharmonics(pitch) {
  return notes.default[octaveMod(pitch)].enharmonics;
}

export function getShortestOrDefault(pitch, isSharp) {
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

export function hasAccidental(scale, accidental) {
  return scale.reduce((acc, note) => acc || note.includes(accidental), false);
}

export function hasBothAccidentals(scale) {
  return (
    hasAccidental(scale, accidentals.sharp) &&
    hasAccidental(scale, accidentals.flat)
  );
}

export function getLetterSequence(mode, isSharp) {
  const key = getKey(mode.getPitchCenter());
  const letterName = (isSharp ? key.sharpName : key.flatName)[0];
  const index = letterNames.indexOf(letterName);
  return letterNames.slice(index).concat(letterNames.slice(0, index));
}

export function isWholeStep(pitches, i) {
  return pitches[i + 1] - pitches[i] === 2;
}

export function isValid(scale) {
  return scale.includes(undefined) ? false : scale;
}
