/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { BREAKPOINTS, DROP_DOWN_STATE } from '../constants';
import * as filters from '../logic/filters';

// NOTES
export const getNotesState = (store) => store.notes;

export const getNoteSelection = (store) =>
  getNotesState(store) ? getNotesState(store).notes : [];

export const getNoteStateByIndex = (store, index) =>
  getNoteSelection(store)[index];

export const getRoot = (store) =>
  getNotesState(store) ? getNotesState(store).root : undefined;

export const getModeList = (store) =>
  getNotesState(store) ? getNotesState(store).modeList : [];

export const getFilteredModeList = (
  store,
  cardinality = getCardinality(store)
) =>
  getModeList(store)
    .filter(filters.byRoot(getRoot(store)))
    .filter(filters.byCardinality(cardinality))
    .filter(
      filters.bySelection(
        getNoteSelection(store),
        getSelectionFilterState(store)
      )
    )
    .filter(filters.byTonality(getTonalityState(store)));

// QUICK_GUIDE
export const getGuideState = (store) => store.quickGuide;

export const getIsGuideDismissed = (store) =>
  getGuideState(store) ? getGuideState(store).isDismissed : undefined;

export const getIsGuideShown = (store) =>
  getGuideState(store) ? getGuideState(store).isShown : undefined;

// GUIDE_INDEX
export const getGuideIndex = (store) => store.guideIndex;

// MODE_CARD
export const getModeCardState = (store) => store.modeCard;

export const getIsModeCardShown = (store) =>
  getModeCardState(store) ? getModeCardState(store).isShown : undefined;

export const getModeCardMode = (store) =>
  getModeCardState(store) ? getModeCardState(store).mode : undefined;

// NAV_DROP_DOWNS
export const getDropDownState = (store) => store.navDropDowns;

// OVERLAY
export const getOverlayState = (store) => store.overlay;

export const getAreKeysShown = (store) =>
  getOverlayState(store) ? getOverlayState(store).areKeysShown : undefined;

export const getAreNoteNamesShown = (store) =>
  getOverlayState(store) ? getOverlayState(store).areNoteNamesShown : undefined;

// SELECTION FILTER
export const getSelectionFilterState = (store) => store.selectionFilter;

// CLEF
export const getClef = (store) => store.clef;

// TONALITIES
export const getTonalityState = (store) => store.tonalities;

export const getTonalityStateByIndex = (store, index) =>
  getTonalityState(store)[index];

// CARDINALITY
export const getCardinality = (store) => store.cardinality;

// KEY_FREEZE
export const getArePopOversActive = (store) =>
  getIsModeCardShown(store) || getIsGuideShown(store);

export const getAreDropDownsActive = (store) =>
  getDropDownState(store) !== DROP_DOWN_STATE.NONE;

// SCREEN_SIZE
export const getNumOctaves = (store) => {
  switch (true) {
    case store.screenSize.width < BREAKPOINTS.sm:
      return 1;
    case store.screenSize.width < BREAKPOINTS.lg:
      return 2;
    default:
      return 3;
  }
};

export const isShortModeActive = (store) =>
  store.screenSize.height < BREAKPOINTS.ht;
