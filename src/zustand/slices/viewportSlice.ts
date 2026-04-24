/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

const getCurrentScreenSize = () => ({
  width: typeof window === 'undefined' ? 0 : window.innerWidth,
  height: typeof window === 'undefined' ? 0 : window.innerHeight,
});

export const createViewportSlice = (set) => ({
  screenSize: getCurrentScreenSize(),

  updateScreenSize: () =>
    set({
      screenSize: getCurrentScreenSize(),
    }),
});
