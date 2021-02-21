/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { NOTE_SELECT, ROOT_SELECT, NOTE_RESET } from '../actionTypes';

import { notesInOctave } from '../../logic/utilities';
import { getModeList } from '../../logic/getModeLists';

const initialState = {
  notes: Array(notesInOctave).fill(false),
  root: undefined,
  modeList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NOTE_SELECT: {
      const i = action.payload.noteIndex;
      const isRoot = i === state.root;
      const notes = [
        ...state.notes.slice(0, i),
        !state.notes[i],
        ...state.notes.slice(i + 1),
      ];
      return {
        notes,
        root: isRoot ? initialState.root : state.root,
        modeList: getModeList(notes),
      };
    }

    case ROOT_SELECT: {
      const i = action.payload.noteIndex;
      const isRoot = i === state.root;
      const notes = [
        ...state.notes.slice(0, i),
        true,
        ...state.notes.slice(i + 1),
      ];
      return {
        notes,
        root: isRoot ? initialState.root : i,
        modeList: getModeList(notes),
      };
    }

    case NOTE_RESET:
      return initialState;

    default:
      return state;
  }
}
