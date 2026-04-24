/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import notes from './notes';
import quickGuide from './quickGude';
import guideIndex from './guideIndex';
import modeCard from './modeCard';
import navDropDowns from './navDropDowns';
import overlay from './overlay';
import selectionFilter from './selectionFilter';
import clef from './clef';
import tonalities from './tonalities';
import cardinality from './cardinality';
import screenSize from './screenSize';

function rootReducer(state = {}, action) {
  return {
    notes: notes(state.notes, action),
    quickGuide: quickGuide(state.quickGuide, action),
    guideIndex: guideIndex(state.guideIndex, action),
    modeCard: modeCard(state.modeCard, action),
    navDropDowns: navDropDowns(state.navDropDowns, action),
    overlay: overlay(state.overlay, action),
    selectionFilter: selectionFilter(state.selectionFilter, action),
    clef: clef(state.clef, action),
    tonalities: tonalities(state.tonalities, action),
    cardinality: cardinality(state.cardinality, action),
    screenSize: screenSize(state.screenSize, action),
  };
}

export default rootReducer;
