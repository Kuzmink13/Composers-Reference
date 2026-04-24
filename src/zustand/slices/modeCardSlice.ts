/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

export const getInitialModeCardState = () => ({
  isShown: false,
  mode: undefined,
});

export const createModeCardSlice = (set) => ({
  modeCard: getInitialModeCardState(),

  openModeCard: (mode) =>
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
