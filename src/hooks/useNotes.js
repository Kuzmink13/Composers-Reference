/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as keyMap from '../assets/keyMap.json';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { noteReset, noteSelect, rootSelect } from '../redux/actions';
import { getKeyState } from '../redux/selectors';

function useNotes() {
  const dispatch = useDispatch();
  const isFrozen = !useSelector(getKeyState);

  const KeyBoardPress = useCallback(
    (event) => {
      if (isFrozen) return;
      const pressedNote = keyMap.keyToNote[event.code];
      if (pressedNote !== undefined) {
        event.shiftKey
          ? dispatch(rootSelect(pressedNote))
          : dispatch(noteSelect(pressedNote));
      }
    },
    [dispatch, isFrozen]
  );

  const clearKeys = () => {
    if (isFrozen) return;
    dispatch(noteReset());
  };

  useKeyboardFn(KeyBoardPress);
  useKeyboardFn(clearKeys, keyArrays.delete);

  return [];
}

export default useNotes;
