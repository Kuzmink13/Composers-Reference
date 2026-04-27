/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback } from 'react';
import { useStore } from '../zustand/hooks';

import { keyMap } from '../assets/data';

import useKeyboardFn from './useKeyboardFn';

import { DROP_DOWN_STATE, KEY_ARRAYS } from '../constants';

function useKeyboard() {
  const closeDropDown = useStore((state) => state.closeDropDown);
  const noteReset = useStore((state) => state.noteReset);
  const noteSelect = useStore((state) => state.noteSelect);
  const rootSelect = useStore((state) => state.rootSelect);
  const toggleDropDown = useStore((state) => state.toggleDropDown);
  const arePopOversActive = useStore(
    (state) => state.modeCard.isShown || state.quickGuide.isShown
  );
  const areDropDownsActive = useStore(
    (state) => state.navDropDowns !== DROP_DOWN_STATE.NONE
  );

  // NOTE-SELECTION
  const KeyBoardPress = useCallback(
    (event: KeyboardEvent) => {
      if (arePopOversActive || areDropDownsActive) return;
      const pressedNote = keyMap.keyToNote[event.code];
      if (pressedNote !== undefined) {
        event.shiftKey ? rootSelect(pressedNote) : noteSelect(pressedNote);
      }
    },
    [
      arePopOversActive,
      areDropDownsActive,
      rootSelect,
      noteSelect,
    ]
  );

  const clearKeys = () => {
    if (arePopOversActive || areDropDownsActive) return;
    noteReset();
  };

  // DROP-DOWNS
  const handleNavShortcuts = (event: KeyboardEvent): void => {
    if (arePopOversActive) return;
    switch (event.code) {
      case 'KeyO':
        toggleDropDown(DROP_DOWN_STATE.OPTIONS);
        return;
      case 'KeyL':
        toggleDropDown(DROP_DOWN_STATE.MENU);
        return;
      default:
        return;
    }
  };

  function closeAll() {
    if (arePopOversActive) return;
    closeDropDown();
  }

  // SET LISTENERS
  useKeyboardFn(KeyBoardPress);
  useKeyboardFn(clearKeys, KEY_ARRAYS.delete);
  useKeyboardFn(handleNavShortcuts);
  useKeyboardFn(closeAll, KEY_ARRAYS.escape);
}

export default useKeyboard;
