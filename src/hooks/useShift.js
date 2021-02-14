/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useDispatch, useSelector } from 'react-redux';

import useKeyboardFn, { keyArrays } from './useKeyboardFn';

import { openModeCard } from '../redux/actions';
import { getModeCardMode } from '../redux/selectors';

function useShift() {
  const dispatch = useDispatch();
  const mode = useSelector(getModeCardMode);
  const open = (mode) => dispatch(openModeCard(mode));
  const shift = {
    relative: (isFwShift) => {
      open(mode.relativeShift(isFwShift));
    },
    parallel: (isFwShift) => {
      open(mode.parallelShift(isFwShift));
    },
    key: (isFwShift) => {
      open(mode.keyShift(isFwShift));
    },
    relativeBrightness: (isFwShift) => {
      open(mode.relativeBrightnessShift(isFwShift));
    },
  };

  const shiftLR = (event, isFwShift, isAltered = event.shiftKey) => {
    event.preventDefault();
    isAltered ? shift.relativeBrightness(isFwShift) : shift.relative(isFwShift);
  };

  const shiftUD = (event, isFwShift, isAltered = event.shiftKey) => {
    event.preventDefault();
    isAltered ? shift.key(isFwShift) : shift.parallel(isFwShift);
  };

  const handleKeyShift = (event) => {
    switch (event.key) {
      case keyArrays.left.join():
        return shiftLR(event, false);
      case keyArrays.right.join():
        return shiftLR(event, true);
      case keyArrays.down.join():
        return shiftUD(event, false);
      case keyArrays.up.join():
        return shiftUD(event, true);
      default:
        return;
    }
  };

  useKeyboardFn(handleKeyShift);

  return [{ LR: shiftLR, UD: shiftUD }];
}

export default useShift;
