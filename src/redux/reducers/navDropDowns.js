/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { OPEN_DROP_DOWN, CLOSE_DROP_DOWN } from '../actionTypes';
import { DROP_DOWN_STATE } from '../../constants';

const initialState = DROP_DOWN_STATE.NONE;

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_DROP_DOWN:
      return action.payload.dropDownState;

    case CLOSE_DROP_DOWN:
      return DROP_DOWN_STATE.NONE;

    default:
      return state;
  }
}
