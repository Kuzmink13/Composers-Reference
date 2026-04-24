/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useStoreWithEqualityFn } from 'zustand/traditional';

import store from './store';

export const useDispatch = () =>
  useStoreWithEqualityFn(store, (state) => state.dispatch);

export const useSelector = (selector, equalityFn = Object.is) =>
  useStoreWithEqualityFn(store, selector, equalityFn);
