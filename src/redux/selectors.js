/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

export const getNotesState = (store) => store.notes;

export const getNoteSelection = (store) =>
  getNotesState(store) ? getNotesState(store).notes : [];

export const getNoteStateByIndex = (store, index) =>
  getNoteSelection(store)[index];

export const getRoot = (store) =>
  getNotesState(store) ? getNotesState(store).root : undefined;
