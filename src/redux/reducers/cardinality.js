/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { CHANGE_CARDINALITY } from '../actionTypes';
import { SUPPORTED_SCALE_LENGTHS } from '../../constants';

const initialState = SUPPORTED_SCALE_LENGTHS.SEVEN;

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_CARDINALITY:
      return action.payload.cardinality;

    default:
      return state;
  }
}
