/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useDispatch } from 'react-redux';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';
import { closeModeCard } from '../redux/actions';

function useModeCard() {
  const dispatch = useDispatch();
  useKeyboardFn(() => dispatch(closeModeCard()), keyArrays.escape);
  return [];
}

export default useModeCard;
