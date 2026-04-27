/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  SUPPORTED_CLEFS,
  SUPPORTED_SCALE_LENGTHS,
  SUPPORTED_TONALITIES,
} from '../../constants';
import type {
  Clef,
  DisplaySlice,
  OverlayState,
  PersistedState,
  StoreSet,
  StoreGet,
  Cardinality,
} from '../types';

const getInitialOverlayState = (): OverlayState => ({
  areKeysShown: false,
  areNoteNamesShown: false,
});

const getInitialTonalitiesState = (): boolean[] =>
  Array.from(SUPPORTED_TONALITIES, () => true);

export const createDisplaySlice = (
  set: StoreSet,
  _get: StoreGet,
  persistedState: PersistedState = {}
): DisplaySlice => ({
  overlay: {
    ...getInitialOverlayState(),
    ...(persistedState.overlay || {}),
  },
  selectionFilter:
    persistedState.selectionFilter === undefined
      ? false
      : persistedState.selectionFilter,
  clef: persistedState.clef || SUPPORTED_CLEFS.TREBLE,
  tonalities: persistedState.tonalities || getInitialTonalitiesState(),
  cardinality: SUPPORTED_SCALE_LENGTHS.SEVEN,

  toggleKeyOverlay: () =>
    set((state) => ({
      overlay: {
        areKeysShown: !state.overlay.areKeysShown,
        areNoteNamesShown: state.overlay.areNoteNamesShown,
      },
    })),

  toggleNoteOverlay: () =>
    set((state) => ({
      overlay: {
        areKeysShown: state.overlay.areKeysShown,
        areNoteNamesShown: !state.overlay.areNoteNamesShown,
      },
    })),

  clearOverlays: () =>
    set({
      overlay: getInitialOverlayState(),
    }),

  toggleSelectionFilter: () =>
    set((state) => ({
      selectionFilter: !state.selectionFilter,
    })),

  resetSelectionFilter: () =>
    set({
      selectionFilter: false,
    }),

  changeClef: (clef: Clef) =>
    set({
      clef,
    }),

  resetClef: () =>
    set({
      clef: SUPPORTED_CLEFS.TREBLE,
    }),

  toggleTonality: (index: number) =>
    set((state) => ({
      tonalities: [
        ...state.tonalities.slice(0, index),
        !state.tonalities[index],
        ...state.tonalities.slice(index + 1),
      ],
    })),

  resetTonalities: () =>
    set({
      tonalities: getInitialTonalitiesState(),
    }),

  changeCardinality: (cardinality: Cardinality) =>
    set({
      cardinality,
    }),
});
