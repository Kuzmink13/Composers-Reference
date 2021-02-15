/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { CHANGE_CLEF, RESET_CLEF } from '../actionTypes';
import { SUPPORTED_CLEFS } from '../../constants';

const initialState = SUPPORTED_CLEFS.TREBLE;

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_CLEF:
      return action.payload.clef;

    case RESET_CLEF:
      return initialState;

    default:
      return state;
  }
}
