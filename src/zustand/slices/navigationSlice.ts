/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { DROP_DOWN_STATE } from '../../constants';

export const createNavigationSlice = (set) => ({
  navDropDowns: DROP_DOWN_STATE.NONE,

  toggleDropDown: (dropDownState) =>
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
