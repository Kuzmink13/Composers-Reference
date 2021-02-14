/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import {
  GUIDE_DECREMENT,
  GUIDE_INCREMENT,
  GUIDE_RESET,
  TOGGLE_GUIDE_DISMISSED,
  TOGGLE_GUIDE_SHOWN,
} from '../actionTypes';
import { numPages } from '../../components/GuideContent';

const initialState = {
  isDismissed: false,
  isShown: true,
  index: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_GUIDE_DISMISSED:
      return Object.assign({}, state, {
        isDismissed: action.payload.isDismissed ?? !state.isDismissed,
      });

    case TOGGLE_GUIDE_SHOWN:
      return Object.assign({}, state, {
        isShown: action.payload.isShown ?? !state.isShown,
      });

    case GUIDE_RESET:
      return Object.assign({}, state, {
        isDismissed: initialState.isDismissed,
      });

    case GUIDE_INCREMENT:
      return Object.assign({}, state, {
        index: state.index < numPages - 1 ? state.index + 1 : state.index,
      });

    case GUIDE_DECREMENT:
      return Object.assign({}, state, {
        index: state.index > 0 ? state.index - 1 : state.index,
      });

    default:
      return state;
  }
}
