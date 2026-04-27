/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import type {
  ModeCardSlice,
  ModeCardState,
  PersistedState,
  StoreSet,
  StoreGet,
} from '../types';
import type Mode from '../../objects/Mode';

export const getInitialModeCardState = (): ModeCardState => ({
  isShown: false,
  mode: null,
});

export const createModeCardSlice = (
  set: StoreSet,
  _get: StoreGet,
  _persistedState: PersistedState = {}
): ModeCardSlice => ({
  modeCard: getInitialModeCardState(),

  openModeCard: (mode: Mode) =>
    set({
      modeCard: {
        isShown: true,
        mode,
      },
    }),

  closeModeCard: () =>
    set({
      modeCard: getInitialModeCardState(),
    }),
});
