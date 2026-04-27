/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import * as s from './scaleUtilities';
import type Mode from '../objects/Mode';

const defaultAccidental = s.accidentals.sharp;

type Scale = Array<string | undefined>;
type ValidScale = string[];
type ScaleBuilder = (mode: Mode, options: { isSharp: boolean }) => Scale;

const scaleFn: Record<number, ScaleBuilder> = {
  8: getEightNoteScale,
  7: getSevenNoteScale,
  6: getSixNoteScale,
};

function getEightNoteScale(mode: Mode, { isSharp }: { isSharp: boolean }): Scale {
  const scale: Scale = [];
  const pitches = mode.getAbsolutePitches();
  const letterSequence = s.getLetterSequence(mode, isSharp);

  let hasJumped = 0;

  letterSequence.forEach((letter, i) => {
    const enharmonics = s.getEnharmonics(pitches[i + hasJumped]);
    const note = enharmonics[letter];
    const nextNote = note ? s.oneLetterWholeSteps[note] : undefined;

    scale.push(note);

    if (s.isWholeStep(pitches, i) && nextNote && hasJumped === 0) {
      scale.push(nextNote);
      hasJumped = 1;
    }
  });

  scale.length < pitches.length && scale.push(undefined);

  return scale;
}

function getSevenNoteScale(mode: Mode, { isSharp }: { isSharp: boolean }): Scale {
  const pitches = mode.getAbsolutePitches();
  const scale = s
    .getLetterSequence(mode, isSharp)
    .map((letter, i) => s.getEnharmonics(pitches[i])[letter]);

  return scale;
}

function getSixNoteScale(mode: Mode, { isSharp }: { isSharp: boolean }): Scale {
  const scale: Scale = [];

  mode.getAbsolutePitches().forEach((pitch, i) => {
    const shortestNote = s.getShortestOrDefault(pitch, isSharp);
    const altNote = s.getKey(pitch).flatName;
    const prevNote = scale[i - 1] || ' ';

    //prettier-ignore
    prevNote[0] !== shortestNote[0]
      ? scale.push(shortestNote)
      : prevNote[0] !== altNote[0]
        ? scale.push(altNote)
        : scale.push(undefined);
  });

  return scale;
}

function getDefaultScale(mode: Mode, { isSharp }: { isSharp: boolean }): Scale {
  const pitches = mode.getAbsolutePitches();
  const scale = pitches.map((pitch) => s.getShortestOrDefault(pitch, isSharp));

  return scale;
}

function scaleLengthReducer() {
  return (a: ValidScale, b: ValidScale): ValidScale => {
    // BY SHORTEST ACCIDENTAL QUANTITY
    if (a.join().length !== b.join().length)
      return a.join().length < b.join().length ? a : b;
    // BY NO MULTIPLE UNIQUE ACCIDENTALS
    if (s.hasBothAccidentals(a) !== s.hasBothAccidentals(b))
      return s.hasBothAccidentals(b) ? a : b;
    // BY SHORTEST ROOT NOTE
    if (a[0].length !== b[0].length) return a[0].length < b[0].length ? a : b;
    // BY DEFAULT ACCIDENTAL
    return s.hasAccidental(a, defaultAccidental) ? a : b;
  };
}

function getScales(mode: Mode): Array<ValidScale | false> {
  const getScale = scaleFn[mode.getNoteQuantity()] || getDefaultScale;
  return [
    getScale(mode, { isSharp: true }),
    getScale(mode, { isSharp: false }),
  ].map((el) => s.isValid(el));
}

function getScaleNotes(mode: Mode): ValidScale {
  const validScales = getScales(mode).filter(
    (el): el is ValidScale => el !== false
  );

  if (validScales.length === 0) {
    return [];
  }

  return validScales.reduce(scaleLengthReducer());
}

export default getScaleNotes;
