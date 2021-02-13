/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { NOTE_SELECT, ROOT_SELECT, NOTE_RESET } from '../actionTypes';
import { notesInOctave } from '../../logic/utilities';

const initialState = {
  notes: Array(notesInOctave).fill(false),
  root: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTE_SELECT: {
      const i = action.payload.noteIndex;
      const isRoot = i === state.root;
      return {
        notes: [
          ...state.notes.slice(0, i),
          !state.notes[i],
          ...state.notes.slice(i + 1),
        ],
        root: isRoot ? initialState.root : state.root,
      };
    }

    case ROOT_SELECT: {
      const i = action.payload.noteIndex;
      const isRoot = i === state.root;
      return {
        notes: [...state.notes.slice(0, i), true, ...state.notes.slice(i + 1)],
        root: isRoot ? initialState.root : i,
      };
    }

    case NOTE_RESET:
      return initialState;

    default:
      return state;
  }
}
