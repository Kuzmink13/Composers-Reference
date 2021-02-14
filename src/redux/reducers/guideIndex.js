/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { GUIDE_DECREMENT, GUIDE_INCREMENT } from '../actionTypes';
import { numPages } from '../../components/GuideContent';

const initialState = 0;

export default function (state = initialState, action) {
  switch (action.type) {
    case GUIDE_INCREMENT:
      return state < numPages - 1 ? state + 1 : state;

    case GUIDE_DECREMENT:
      return state > 0 ? state - 1 : state;

    default:
      return state;
  }
}
