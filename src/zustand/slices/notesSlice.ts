/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getModeList from '../../logic/getModeList';
import { notesInOctave } from '../../logic/utilities';

export const getInitialNotesState = () => ({
  notes: Array(notesInOctave).fill(false),
  root: undefined,
  modeList: [],
});

export const createNotesSlice = (set) => ({
  notes: getInitialNotesState(),

  noteSelect: (noteIndex) =>
    set((state) => {
      const isRoot = noteIndex === state.notes.root;
      const notes = [
        ...state.notes.notes.slice(0, noteIndex),
        !state.notes.notes[noteIndex],
        ...state.notes.notes.slice(noteIndex + 1),
      ];

      return {
        notes: {
          notes,
          root: isRoot ? undefined : state.notes.root,
          modeList: getModeList(notes),
        },
      };
    }),

  rootSelect: (noteIndex) =>
    set((state) => {
      const isRoot = noteIndex === state.notes.root;
      const notes = [
        ...state.notes.notes.slice(0, noteIndex),
        true,
        ...state.notes.notes.slice(noteIndex + 1),
      ];

      return {
        notes: {
          notes,
          root: isRoot ? undefined : noteIndex,
          modeList: getModeList(notes),
        },
      };
    }),

  noteReset: () =>
    set({
      notes: getInitialNotesState(),
    }),
});
