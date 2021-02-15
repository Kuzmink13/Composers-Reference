/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

// NOTES
export const getNotesState = (store) => store.notes;

export const getNoteSelection = (store) =>
  getNotesState(store) ? getNotesState(store).notes : [];

export const getNoteStateByIndex = (store, index) =>
  getNoteSelection(store)[index];

export const getRoot = (store) =>
  getNotesState(store) ? getNotesState(store).root : undefined;

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
