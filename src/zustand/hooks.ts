/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useStore as useZustandStore } from 'zustand';

import store from './store';
import type { AppState } from './types';

export const useStore = <T>(selector: (state: AppState) => T): T =>
  useZustandStore(store, selector);
