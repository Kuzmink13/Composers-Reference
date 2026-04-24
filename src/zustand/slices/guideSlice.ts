/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { numPages } from '../../components/guidePages';

const getInitialQuickGuideState = () => ({
  isDismissed: false,
  isShown: true,
});

export const createGuideSlice = (set, _get, persistedState = {}) => ({
  quickGuide: {
    ...getInitialQuickGuideState(),
    ...(persistedState.quickGuide || {}),
  },
  guideIndex: 0,

  toggleGuideDismissed: (isDismissed = undefined) =>
    set((state) => ({
      quickGuide: {
        isDismissed: isDismissed ?? !state.quickGuide.isDismissed,
        isShown: state.quickGuide.isShown,
      },
    })),

  toggleGuideShown: (isShown = undefined) =>
    set((state) => ({
      quickGuide: {
        isDismissed: state.quickGuide.isDismissed,
        isShown: isShown ?? !state.quickGuide.isShown,
      },
    })),

  guideReset: () =>
    set((state) => ({
      quickGuide: {
        isDismissed: false,
        isShown: state.quickGuide.isShown,
      },
    })),

  guideIncrement: () =>
    set((state) => ({
      guideIndex:
        state.guideIndex < numPages - 1 ? state.guideIndex + 1 : state.guideIndex,
    })),

  guideDecrement: () =>
    set((state) => ({
      guideIndex: state.guideIndex > 0 ? state.guideIndex - 1 : state.guideIndex,
    })),
});
