/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useStore } from '../zustand/hooks';

import useKeyboardFn from './useKeyboardFn';

import { KEY_ARRAYS } from '../constants';
import type Mode from '../objects/Mode';

export type ShiftEvent = {
  preventDefault: () => void;
  shiftKey?: boolean;
  key?: string;
};

interface ShiftHandlers {
  LR: (event: ShiftEvent, isFwShift: boolean, isAltered?: boolean) => void;
  UD: (event: ShiftEvent, isFwShift: boolean, isAltered?: boolean) => void;
}

function useShift(): [ShiftHandlers] {
  const openModeCard = useStore((state) => state.openModeCard);
  const mode = useStore((state) => state.modeCard.mode);
  const open = (nextMode: Mode): void => openModeCard(nextMode);
  const shift = {
    relative: (isFwShift: boolean) => {
      if (!mode) return;
      open(mode.relativeShift(isFwShift));
    },
    parallel: (isFwShift: boolean) => {
      if (!mode) return;
      open(mode.parallelShift(isFwShift));
    },
    key: (isFwShift: boolean) => {
      if (!mode) return;
      open(mode.keyShift(isFwShift));
    },
    relativeBrightness: (isFwShift: boolean) => {
      if (!mode) return;
      open(mode.relativeBrightnessShift(isFwShift));
    },
  };

  const shiftLR = (
    event: ShiftEvent,
    isFwShift: boolean,
    isAltered = Boolean(event.shiftKey)
  ): void => {
    event.preventDefault();
    isAltered ? shift.relativeBrightness(isFwShift) : shift.relative(isFwShift);
  };

  const shiftUD = (
    event: ShiftEvent,
    isFwShift: boolean,
    isAltered = Boolean(event.shiftKey)
  ): void => {
    event.preventDefault();
    isAltered ? shift.key(isFwShift) : shift.parallel(isFwShift);
  };

  const handleKeyShift = (event: KeyboardEvent): void => {
    switch (event.key) {
      case KEY_ARRAYS.left.join():
        return shiftLR(event, false);
      case KEY_ARRAYS.right.join():
        return shiftLR(event, true);
      case KEY_ARRAYS.down.join():
        return shiftUD(event, false);
      case KEY_ARRAYS.up.join():
        return shiftUD(event, true);
      default:
        return;
    }
  };

  useKeyboardFn(handleKeyShift);

  return [{ LR: shiftLR, UD: shiftUD }];
}

export default useShift;
