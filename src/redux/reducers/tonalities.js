/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { RESET_TONALITIES, TOGGLE_TONALITY } from '../actionTypes';
import { SUPPORTED_TONALITIES } from '../../constants';

const initialState = Array.from(SUPPORTED_TONALITIES, () => true);

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_TONALITY: {
      const i = action.payload.index;
      return [...state.slice(0, i), !state[i], ...state.slice(i + 1)];
    }

    case RESET_TONALITIES:
      return initialState;

    default:
      return state;
  }
}
