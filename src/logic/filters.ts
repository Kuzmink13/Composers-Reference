/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { SUPPORTED_TONALITIES } from '../constants';
import type Mode from '../objects/Mode';
import type { Cardinality } from '../zustand/types';

export function byCardinality(cardinality: Cardinality) {
  return (mode: Mode): boolean => mode.getNoteQuantity() === cardinality.number;
}

export function byTonality(tonalities: boolean[]) {
  return (mode: Mode): boolean =>
    tonalities.reduce(
      (prev, curr, i) =>
        prev ||
        (curr && mode.getParentTonality() === SUPPORTED_TONALITIES[i].name),
      false
    );
}

export function bySelection(notes: boolean[], isFiltered: boolean) {
  return (mode: Mode): boolean =>
    !isFiltered ||
    notes.reduce(
      (prev, curr, i) => prev || (curr && i === mode.getPitchCenter()),
      false
    );
}

export function byRoot(root: number | undefined) {
  return (mode: Mode): boolean =>
    root === undefined ? true : mode.getPitchCenter() === root;
}
