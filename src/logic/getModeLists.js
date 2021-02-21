/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getAllModes from './getAllModes';
import { supportedScaleLengths } from './scaleUtilities';
import { SUPPORTED_TONALITIES } from '../constants';

function convertToPitchArray(notes) {
  return notes
    .map((el, i) => (el ? i : undefined))
    .filter((el) => el !== undefined);
}

function noteQuantityFilter(noteQuantity) {
  return (mode) => mode.getNoteQuantity() === noteQuantity;
}

function noteSelectionFilter(notes, isSelectionFiltered) {
  return (mode) => !isSelectionFiltered || notes[mode.getPitchCenter()];
}

function getModeLists(notes, root, tonalities, isSelectionFiltered) {
  return supportedScaleLengths.map((noteQuantity) =>
    getAllModes(convertToPitchArray(notes), root, tonalities)
      .filter(noteQuantityFilter(noteQuantity))
      .filter(noteSelectionFilter(notes, isSelectionFiltered))
  );
}

export function getModeList(notes) {
  return getAllModes(
    convertToPitchArray(notes),
    undefined,
    SUPPORTED_TONALITIES
  );
}

export default getModeLists;
