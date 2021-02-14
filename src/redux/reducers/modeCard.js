/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { OPEN_MODE_CARD, CLOSE_MODE_CARD } from '../actionTypes';

const initialState = {
  isShown: false,
  mode: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODE_CARD: {
      return {
        isShown: true,
        mode: action.payload.mode,
      };
    }

    case CLOSE_MODE_CARD: {
      return initialState;
    }

    default:
      return state;
  }
}
