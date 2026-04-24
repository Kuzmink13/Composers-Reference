/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import getAllModes from './getAllModes';

function convertToPitchArray(notes) {
  return notes
    .map((el, i) => (el ? i : undefined))
    .filter((el) => el !== undefined);
}

function getModeList(notes) {
  return getAllModes(convertToPitchArray(notes));
}

export default getModeList;
