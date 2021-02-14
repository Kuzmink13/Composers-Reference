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

export const guideIncrement = () => ({
  type: _.GUIDE_INCREMENT,
});

export const guideDecrement = () => ({
  type: _.GUIDE_DECREMENT,
});
