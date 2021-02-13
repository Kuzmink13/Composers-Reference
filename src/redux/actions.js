/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { NOTE_SELECT, ROOT_SELECT, NOTE_RESET } from './actionTypes';

export const noteSelect = (noteIndex) => ({
  type: NOTE_SELECT,
  payload: { noteIndex },
});

export const rootSelect = (noteIndex) => ({
  type: ROOT_SELECT,
  payload: { noteIndex },
});

export const noteRESET = () => ({
  type: NOTE_RESET,
});
