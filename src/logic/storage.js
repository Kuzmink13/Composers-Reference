/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
