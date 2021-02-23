/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  GUIDE_RESET,
  TOGGLE_GUIDE_DISMISSED,
  TOGGLE_GUIDE_SHOWN,
} from '../actionTypes';

const initialState = {
  isDismissed: false,
  isShown: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_GUIDE_DISMISSED:
      return {
        isDismissed: action.payload.isDismissed ?? !state.isDismissed,
        isShown: state.isShown,
      };

    case TOGGLE_GUIDE_SHOWN:
      return {
        isDismissed: state.isDismissed,
        isShown: action.payload.isShown ?? !state.isShown,
      };

    case GUIDE_RESET:
      return {
        isDismissed: initialState.isDismissed,
        isShown: state.isShown,
      };

    default:
      return state;
  }
}
