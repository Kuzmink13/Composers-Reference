/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { numPages } from '../../components/guidePages';
import type {
  GuideSlice,
  PersistedState,
  QuickGuideState,
  StoreSet,
  StoreGet,
} from '../types';

const getInitialQuickGuideState = (): QuickGuideState => ({
  isDismissed: false,
  isShown: true,
});

export const createGuideSlice = (
  set: StoreSet,
  _get: StoreGet,
  persistedState: PersistedState = {}
): GuideSlice => ({
  quickGuide: {
    ...getInitialQuickGuideState(),
    ...(persistedState.quickGuide || {}),
  },
  guideIndex: 0,

  toggleGuideDismissed: (isDismissed?: boolean) =>
    set((state) => ({
      quickGuide: {
        isDismissed: isDismissed ?? !state.quickGuide.isDismissed,
        isShown: state.quickGuide.isShown,
      },
    })),

  toggleGuideShown: (isShown?: boolean) =>
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
