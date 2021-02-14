/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useDispatch } from 'react-redux';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { toggleGuideShown } from '../redux/actions';

function useQuickGuide() {
  const dispatch = useDispatch();
  useKeyboardFn(() => dispatch(toggleGuideShown(false)), keyArrays.escape);

  return [];
}

export default useQuickGuide;
