/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { CHANGE_KEY_STATE } from '../actionTypes';

const initialState = true;

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_KEY_STATE:
      return action.payload.bool;

    default:
      return state;
  }
}
