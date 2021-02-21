/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import * as _ from './actionTypes';

// NOTES
export const noteSelect = (noteIndex) => ({
  type: _.NOTE_SELECT,
  payload: { noteIndex },
});

export const rootSelect = (noteIndex) => ({
  type: _.ROOT_SELECT,
  payload: { noteIndex },
});

export const noteReset = () => ({
  type: _.NOTE_RESET,
});

// QUICK_GUIDE
export const toggleGuideDismissed = (isDismissed = undefined) => ({
  type: _.TOGGLE_GUIDE_DISMISSED,
  payload: { isDismissed },
});

export const toggleGuideShown = (isShown = undefined) => ({
  type: _.TOGGLE_GUIDE_SHOWN,
  payload: { isShown },
});

export const guideReset = () => ({
  type: _.GUIDE_RESET,
});

// GUIDE_INDEX
export const guideIncrement = () => ({
  type: _.GUIDE_INCREMENT,
});

export const guideDecrement = () => ({
  type: _.GUIDE_DECREMENT,
});

// MODE_CARD
export const openModeCard = (mode) => ({
  type: _.OPEN_MODE_CARD,
  payload: { mode },
});

export const closeModeCard = () => ({
  type: _.CLOSE_MODE_CARD,
});

// NAV_DROP_DOWNS
export const toggleDropDown = (dropDownState) => ({
  type: _.TOGGLE_DROP_DOWN,
  payload: { dropDownState },
});

export const closeDropDown = () => ({
  type: _.CLOSE_DROP_DOWN,
});

// OVERLAY
export const toggleKeyOverlay = () => ({
  type: _.TOGGLE_KEY_OVERLAY,
});

export const toggleNoteOverlay = () => ({
  type: _.TOGGLE_NOTE_OVERLAY,
});

export const clearOverlays = () => ({
  type: _.CLEAR_OVERLAYS,
});

// SELECTION_FILTER
export const toggleSelectionFilter = () => ({
  type: _.TOGGLE_SELECTION_FILTER,
});

export const resetSelectionFilter = () => ({
  type: _.RESET_SELECTION_FILTER,
});

// CLEF
export const changeClef = (clef) => ({
  type: _.CHANGE_CLEF,
  payload: { clef },
});

export const resetClef = () => ({
  type: _.RESET_CLEF,
});

// TONALITIES
export const toggleTonality = (index) => ({
  type: _.TOGGLE_TONALITY,
  payload: { index },
});

export const resetTonalities = () => ({
  type: _.RESET_TONALITIES,
});

// CARDINALITY
export const changeCardinality = (cardinality) => ({
  type: _.CHANGE_CARDINALITY,
  payload: { cardinality },
});
