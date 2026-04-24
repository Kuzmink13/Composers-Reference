/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { createStore } from 'zustand/vanilla';
import throttle from 'lodash/throttle';

import notesReducer from './reducers/notes';
import quickGuideReducer from './reducers/quickGude';
import guideIndexReducer from './reducers/guideIndex';
import modeCardReducer from './reducers/modeCard';
import navDropDownsReducer from './reducers/navDropDowns';
import overlayReducer from './reducers/overlay';
import selectionFilterReducer from './reducers/selectionFilter';
import clefReducer from './reducers/clef';
import tonalitiesReducer from './reducers/tonalities';
import cardinalityReducer from './reducers/cardinality';
import screenSizeReducer from './reducers/screenSize';
import { loadState, saveState } from './localStorage';

const INIT_ACTION = { type: '@@INIT' };

const persistedState = loadState() || {};

const resolvePersistedSlice = (key, reducer) => {
  const value = persistedState[key];
  return value === undefined ? reducer(undefined, INIT_ACTION) : value;
};

const getInitialState = () => ({
  notes: resolvePersistedSlice('notes', notesReducer),
  quickGuide: resolvePersistedSlice('quickGuide', quickGuideReducer),
  guideIndex: resolvePersistedSlice('guideIndex', guideIndexReducer),
  modeCard: resolvePersistedSlice('modeCard', modeCardReducer),
  navDropDowns: resolvePersistedSlice('navDropDowns', navDropDownsReducer),
  overlay: resolvePersistedSlice('overlay', overlayReducer),
  selectionFilter: resolvePersistedSlice(
    'selectionFilter',
    selectionFilterReducer
  ),
  clef: resolvePersistedSlice('clef', clefReducer),
  tonalities: resolvePersistedSlice('tonalities', tonalitiesReducer),
  cardinality: resolvePersistedSlice('cardinality', cardinalityReducer),
  screenSize: resolvePersistedSlice('screenSize', screenSizeReducer),
});

const reduceState = (state, action) => ({
  notes: notesReducer(state.notes, action),
  quickGuide: quickGuideReducer(state.quickGuide, action),
  guideIndex: guideIndexReducer(state.guideIndex, action),
  modeCard: modeCardReducer(state.modeCard, action),
  navDropDowns: navDropDownsReducer(state.navDropDowns, action),
  overlay: overlayReducer(state.overlay, action),
  selectionFilter: selectionFilterReducer(state.selectionFilter, action),
  clef: clefReducer(state.clef, action),
  tonalities: tonalitiesReducer(state.tonalities, action),
  cardinality: cardinalityReducer(state.cardinality, action),
  screenSize: screenSizeReducer(state.screenSize, action),
});

const store = createStore((set) => ({
  ...getInitialState(),
  dispatch: (action) => set((state) => reduceState(state, action)),
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
