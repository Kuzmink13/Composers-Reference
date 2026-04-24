/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import * as s from './scaleUtilities';

const defaultAccidental = s.accidentals.sharp;

const scaleFn = {
  8: getEightNoteScale,
  7: getSevenNoteScale,
  6: getSixNoteScale,
};

function getEightNoteScale(mode, { isSharp }) {
  const scale = [];
  const pitches = mode.getAbsolutePitches();
  const letterSequence = s.getLetterSequence(mode, isSharp);

  let hasJumped = false;

  letterSequence.forEach((letter, i) => {
    const note = s.getEnharmonics(pitches[i + hasJumped])[letter];
    const nextNote = s.oneLetterWholeSteps[note];

    scale.push(note);

    if (s.isWholeStep(pitches, i) && nextNote && !hasJumped) {
      scale.push(nextNote);
      hasJumped = true;
    }
  });

  scale.length < pitches.length && scale.push(undefined);

  return scale;
}

function getSevenNoteScale(mode, { isSharp }) {
  const pitches = mode.getAbsolutePitches();
  const scale = s
    .getLetterSequence(mode, isSharp)
    .map((letter, i) => s.getEnharmonics(pitches[i])[letter]);

  return scale;
}

function getSixNoteScale(mode, { isSharp }) {
  const scale = [];

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

function getDefaultScale(mode, { isSharp }) {
  const pitches = mode.getAbsolutePitches();
  const scale = pitches.map((pitch) => s.getShortestOrDefault(pitch, isSharp));

  return scale;
}

function scaleLengthReducer() {
  return (a, b) => {
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

function getScales(mode) {
  const getScale = scaleFn[mode.getNoteQuantity()] || getDefaultScale;
  return [
    getScale(mode, { isSharp: true }),
    getScale(mode, { isSharp: false }),
  ].map((el) => s.isValid(el));
}

function getScaleNotes(mode) {
  return getScales(mode)
    .filter((el) => el !== false)
    .reduce(scaleLengthReducer());
}

export default getScaleNotes;
