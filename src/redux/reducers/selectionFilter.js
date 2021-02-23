/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  RESET_SELECTION_FILTER,
  TOGGLE_SELECTION_FILTER,
} from '../actionTypes';

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SELECTION_FILTER:
      return !state;

    case RESET_SELECTION_FILTER:
      return initialState;

    default:
      return state;
  }
}
