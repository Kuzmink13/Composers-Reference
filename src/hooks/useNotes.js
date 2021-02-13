/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as keyMap from '../assets/keyMap.json';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { noteReset, noteSelect, rootSelect } from '../redux/actions';

function useNotes() {
  const dispatch = useDispatch();

  const KeyBoardPress = useCallback(
    (event) => {
      const pressedNote = keyMap.keyToNote[event.code];
      if (pressedNote !== undefined) {
        event.shiftKey
          ? dispatch(rootSelect(pressedNote))
          : dispatch(noteSelect(pressedNote));
      }
    },
    [dispatch]
  );

  const [toggleFreezeKeys] = useKeyboardFn(KeyBoardPress);
  const [toggleFreezeDel] = useKeyboardFn(
    () => dispatch(noteReset()),
    keyArrays.delete
  );

  const toggleFreeze = (isFrozen) => {
    toggleFreezeKeys(isFrozen);
    toggleFreezeDel(isFrozen);
  };

  return [toggleFreeze];
}

export default useNotes;
