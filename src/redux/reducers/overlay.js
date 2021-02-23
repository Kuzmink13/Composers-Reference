/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  CLEAR_OVERLAYS,
  TOGGLE_KEY_OVERLAY,
  TOGGLE_NOTE_OVERLAY,
} from '../actionTypes';

const initialState = {
  areKeysShown: false,
  areNoteNamesShown: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_KEY_OVERLAY:
      return {
        areKeysShown: !state.areKeysShown,
        areNoteNamesShown: state.areNoteNamesShown,
      };

    case TOGGLE_NOTE_OVERLAY:
      return {
        areKeysShown: state.areKeysShown,
        areNoteNamesShown: !state.areNoteNamesShown,
      };

    case CLEAR_OVERLAYS:
      return initialState;

    default:
      return state;
  }
}
