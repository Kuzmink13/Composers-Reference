import { useReducer, useCallback } from 'react';
import * as keyMap from '../assets/keyMap.json';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { notesInOctave } from '../logic/utilities';

const initialState = {
  notes: Array(notesInOctave).fill(false),
  root: undefined,
};

const actions = {
  select: 'select',
  rootSelect: 'root_select',
  reset: 'reset',
};

function reducer(state, action) {
  const isSelection = (i) => {
    return i === action.payload.note;
  };

  switch (action.type) {
    case actions.select:
      return {
        notes: state.notes.map((el, i) => (isSelection(i) ? !el : el)),
        root: action.payload.isRoot ? initialState.root : state.root,
      };

    case actions.rootSelect:
      return {
        notes: state.notes.map((el, i) => (isSelection(i) ? true : el)),
        root: action.payload.isRoot ? initialState.root : action.payload.note,
      };

    case actions.reset:
      return initialState;

    default:
      return state;
  }
}

function useNotes() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNoteSelection = useCallback(
    (event, note, isRootSelect = event.shiftKey) => {
      dispatch({
        type: isRootSelect ? actions.rootSelect : actions.select,
        payload: { note, isRoot: state.root === note },
      });
    },
    [state.root]
  );

  const resetNotes = () => {
    dispatch({ type: actions.reset });
  };

  const KeyBoardPress = useCallback(
    (event) => {
      const pressedNote = keyMap.keyToNote[event.code];
      pressedNote !== undefined && handleNoteSelection(event, pressedNote);
    },
    [handleNoteSelection]
  );

  const [toggleFreezeKeys] = useKeyboardFn(KeyBoardPress);
  const [toggleFreezeDel] = useKeyboardFn(resetNotes, keyArrays.delete);

  const toggleFreeze = (isFrozen) => {
    toggleFreezeKeys(isFrozen);
    toggleFreezeDel(isFrozen);
  };

  return [state, handleNoteSelection, resetNotes, toggleFreeze];
}

export default useNotes;
