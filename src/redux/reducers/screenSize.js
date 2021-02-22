/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { UPDATE_SCREEN_SIZE } from '../actionTypes';

const initialState = {
  width: window.innerWidth,
  height: window.innnerHeight,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SCREEN_SIZE:
      return {
        width: window.innerWidth,
        height: window.innnerHeight,
      };

    default:
      return state;
  }
}
