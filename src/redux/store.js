/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { createStore } from 'redux';
import rootReducer from './reducers/index';

export default createStore(rootReducer);
