/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as keyMap from '../assets/keyMap.json';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import {
  closeDropDown,
  closeModeCard,
  noteReset,
  noteSelect,
  rootSelect,
  toggleDropDown,
  toggleGuideShown,
} from '../redux/actions';
import {
  getArePopOversActive,
  getAreDropDownsActive,
} from '../redux/selectors';
import { DROP_DOWN_STATE } from '../constants';

function useKeyboard() {
  const dispatch = useDispatch();
  const arePopOversActive = useSelector(getArePopOversActive);
  const areDropDownsActive = useSelector(getAreDropDownsActive);

  // NOTE-SELECTION
  const KeyBoardPress = useCallback(
    (event) => {
      if (arePopOversActive || areDropDownsActive) return;
      const pressedNote = keyMap.keyToNote[event.code];
      if (pressedNote !== undefined) {
        event.shiftKey
          ? dispatch(rootSelect(pressedNote))
          : dispatch(noteSelect(pressedNote));
      }
    },
    [dispatch, arePopOversActive, areDropDownsActive]
  );

  const clearKeys = () => {
    if (arePopOversActive || areDropDownsActive) return;
    dispatch(noteReset());
  };

  // DROP-DOWNS
  const handleNavShortcuts = (event) => {
    if (arePopOversActive) return;
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
    if (arePopOversActive) return;
    dispatch(closeDropDown());
  }

  // SET LISTENERS
  useKeyboardFn(KeyBoardPress);
  useKeyboardFn(clearKeys, keyArrays.delete);
  useKeyboardFn(() => dispatch(closeModeCard()), keyArrays.escape);
  useKeyboardFn(handleNavShortcuts);
  useKeyboardFn(closeAll, keyArrays.escape);
  useKeyboardFn(() => dispatch(toggleGuideShown(false)), keyArrays.escape);
}

export default useKeyboard;
