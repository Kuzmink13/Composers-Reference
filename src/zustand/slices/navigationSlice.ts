/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { DROP_DOWN_STATE } from '../../constants';
import type {
  NavigationSlice,
  PersistedState,
  StoreSet,
  StoreGet,
  DropDownState,
} from '../types';

export const createNavigationSlice = (
  set: StoreSet,
  _get: StoreGet,
  _persistedState: PersistedState = {}
): NavigationSlice => ({
  navDropDowns: DROP_DOWN_STATE.NONE,

  toggleDropDown: (dropDownState: DropDownState) =>
    set((state) => ({
      navDropDowns:
        dropDownState === state.navDropDowns
          ? DROP_DOWN_STATE.NONE
          : dropDownState,
    })),

  closeDropDown: () =>
    set({
      navDropDowns: DROP_DOWN_STATE.NONE,
    }),
});
