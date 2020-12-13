import { useReducer, useCallback, useEffect } from 'react';

import Keyboard from '../logic/Keyboard';
import Utilities from '../logic/Utilities';

const { notesInOctave } = Utilities;

const initialState = {
  notes: Array(notesInOctave).fill(false),
  root: undefined,
};

const ACTIONS = {
  SELECT: 'select',
  ROOT_SELECT: 'root_select',
  RESET: 'reset',
};

function reducer(state, action) {
  const isSelection = (i) => {
    return i === action.payload.note;
  };

  switch (action.type) {
    case ACTIONS.SELECT:
      return {
        notes: state.notes.map((el, i) => (isSelection(i) ? !el : el)),
        root: action.payload.isRoot ? initialState.root : state.root,
      };

    case ACTIONS.ROOT_SELECT:
      return {
        notes: state.notes.map((el, i) => (isSelection(i) ? true : el)),
        root: action.payload.isRoot ? initialState.root : action.payload.note,
      };

    case ACTIONS.RESET:
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
        type: isRootSelect ? ACTIONS.ROOT_SELECT : ACTIONS.SELECT,
        payload: { note, isRoot: state.root === note },
      });
    },
    [state.root]
  );

  const resetNotes = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  const KeyBoardPress = useCallback(
    (event) => {
      if (!event.repeat) {
        const pressedNote = Keyboard.getNote(event.code);
        pressedNote !== undefined && handleNoteSelection(event, pressedNote);
        Keyboard.isDelete(event.key) && resetNotes();
      }
    },
    [handleNoteSelection]
  );

  useEffect(() => {
    document.addEventListener('keydown', KeyBoardPress);
    return () => {
      document.removeEventListener('keydown', KeyBoardPress);
    };
  }, [KeyBoardPress]);

  return [state, handleNoteSelection, resetNotes];
}

export default useNotes;
