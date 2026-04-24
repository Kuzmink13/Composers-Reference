/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  SUPPORTED_CLEFS,
  SUPPORTED_SCALE_LENGTHS,
  SUPPORTED_TONALITIES,
} from '../../constants';

const getInitialOverlayState = () => ({
  areKeysShown: false,
  areNoteNamesShown: false,
});

const getInitialTonalitiesState = () =>
  Array.from(SUPPORTED_TONALITIES, () => true);

export const createDisplaySlice = (set, _get, persistedState = {}) => ({
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

  changeClef: (clef) =>
    set({
      clef,
    }),

  resetClef: () =>
    set({
      clef: SUPPORTED_CLEFS.TREBLE,
    }),

  toggleTonality: (index) =>
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

  changeCardinality: (cardinality) =>
    set({
      cardinality,
    }),
});
