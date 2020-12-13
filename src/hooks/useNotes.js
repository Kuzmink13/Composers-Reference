import { useReducer, useCallback, useEffect } from 'react';

import Keyboard from '../logic/Keyboard';
import Utilities from '../logic/Utilities';

const { notesInOctave } = Utilities;

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