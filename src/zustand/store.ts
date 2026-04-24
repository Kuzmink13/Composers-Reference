/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import throttle from 'lodash/throttle';
import { createStore } from 'zustand/vanilla';

import { loadState, saveState } from './localStorage';
import { createNotesSlice } from './slices/notesSlice';
import { createGuideSlice } from './slices/guideSlice';
import { createModeCardSlice } from './slices/modeCardSlice';
import { createNavigationSlice } from './slices/navigationSlice';
import { createDisplaySlice } from './slices/displaySlice';
import { createViewportSlice } from './slices/viewportSlice';

const persistedState = loadState() || {};

const store = createStore((set, get) => ({
  ...createNotesSlice(set, get, persistedState),
  ...createGuideSlice(set, get, persistedState),
  ...createModeCardSlice(set, get, persistedState),
  ...createNavigationSlice(set, get, persistedState),
  ...createDisplaySlice(set, get, persistedState),
  ...createViewportSlice(set, get, persistedState),
}));

store.subscribe(
  throttle((state) => {
    saveState({
      quickGuide: {
        isDismissed: state.quickGuide.isDismissed,
        isShown: !state.quickGuide.isDismissed,
      },
      overlay: {
        areKeysShown: state.overlay.areKeysShown,
        areNoteNamesShown: state.overlay.areNoteNamesShown,
      },
      selectionFilter: state.selectionFilter,
      clef: state.clef,
      tonalities: state.tonalities,
    });
  }, 1000)
);

export default store;
