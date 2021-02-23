/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { SUPPORTED_TONALITIES } from '../constants';

export function byCardinality(cardinality) {
  return (mode) => mode.getNoteQuantity() === cardinality.number;
}

export function byTonality(tonalities) {
  return (mode) =>
    tonalities.reduce(
      (prev, curr, i) =>
        prev ||
        (curr && mode.getParentTonality() === SUPPORTED_TONALITIES[i].name),
      false
    );
}

export function bySelection(notes, isFiltered) {
  return (mode) =>
    !isFiltered ||
    notes.reduce(
      (prev, curr, i) => prev || (curr && i === mode.getPitchCenter()),
      false
    );
}

export function byRoot(root) {
  return (mode) => (root === undefined ? true : mode.getPitchCenter() === root);
}
