/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useDispatch, useSelector } from 'react-redux';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { closeDropDown, toggleDropDown } from '../redux/actions';
import { getIsGuideShown, getIsModeCardShown } from '../redux/selectors';

import { DROP_DOWN_STATE } from '../constants';

function useNavButtons() {
  const dispatch = useDispatch();
  const isGuideShown = useSelector(getIsGuideShown);
  const isModeCardShown = useSelector(getIsModeCardShown);
  const areKeysFrozen = isGuideShown || isModeCardShown;

  const handleNavShortcuts = (event) => {
    if (areKeysFrozen) return;
    switch (event.code) {
      case 'KeyO':
        dispatch(toggleDropDown(DROP_DOWN_STATE.OPTIONS));
        return;
      case 'KeyL':
        dispatch(toggleDropDown(DROP_DOWN_STATE.MENU));
        return;
      default:
        return;
    }
  };

  function closeAll() {
    if (areKeysFrozen) return;
    dispatch(closeDropDown());
  }

  useKeyboardFn(handleNavShortcuts);
  useKeyboardFn(closeAll, keyArrays.escape);

  return [];
}

export default useNavButtons;
