import { useReducer, useEffect } from 'react';

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
  switch (action.type) {
    case ACTIONS.SELECT:
      return {
        notes: state.notes.map((el, i) =>
          i === action.payload.note ? !el : el
        ),
        root: action.payload.isRoot ? initialState.root : state.root,
      };
    case ACTIONS.ROOT_SELECT:
      return {
        notes: state.notes.map((el, i) =>
          i === action.payload.note ? true : el
        ),
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

  function handleNoteSelection(event, note, isRootPress = event.shiftKey) {
    console.log(note);
    dispatch({
      type: isRootPress ? ACTIONS.ROOT_SELECT : ACTIONS.SELECT,
      payload: { note, isRoot: state.root === note },
    });
  }

  function resetNotes() {
    dispatch({ type: ACTIONS.RESET });
  }

  function KeyBoardPress(event) {
    if (!event.repeat) {
      const pressedNote = Keyboard.getNote(event.code);
      pressedNote !== undefined && handleNoteSelection(event, pressedNote);
      Keyboard.isDelete(event.key) && resetNotes();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', KeyBoardPress);
    return () => {
      document.removeEventListener('keydown', KeyBoardPress);
    };
  });

  return [state, handleNoteSelection, resetNotes];
}

export default useNotes;
