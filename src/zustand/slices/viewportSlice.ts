/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import type {
  ViewportSlice,
  PersistedState,
  StoreSet,
  StoreGet,
} from '../types';

const getCurrentScreenSize = () => ({
  width: typeof window === 'undefined' ? 0 : window.innerWidth,
  height: typeof window === 'undefined' ? 0 : window.innerHeight,
});

export const createViewportSlice = (
  set: StoreSet,
  _get: StoreGet,
  _persistedState: PersistedState = {}
): ViewportSlice => ({
  screenSize: getCurrentScreenSize(),

  updateScreenSize: () =>
    set({
      screenSize: getCurrentScreenSize(),
    }),
});
