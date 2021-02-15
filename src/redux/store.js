/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/index';

import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState({
      quickGuide: {
        isDismissed: store.getState().quickGuide.isDismissed,
        isShown: !store.getState().quickGuide.isDismissed,
      },
      overlay: {
        areKeysShown: store.getState().overlay.areKeysShown,
        areNoteNamesShown: store.getState().overlay.areNoteNamesShown,
      },
      selectionFilter: store.getState().selectionFilter,
    });
  }, 1000)
);

export default store;
