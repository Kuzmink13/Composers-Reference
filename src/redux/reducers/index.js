/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { combineReducers } from 'redux';
import notes from './notes';
import quickGuide from './quickGude';
import guideIndex from './guideIndex';
import modeCard from './modeCard';
import navDropDowns from './navDropDowns';

export default combineReducers({
  notes,
  quickGuide,
  guideIndex,
  modeCard,
  navDropDowns,
});
