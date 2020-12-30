import useKeyboardFn, { keyArrays } from './useKeyboardFn';

function useShift(mode, openModeCard) {
  const shift = {
    relative: (isFwShift) => {
      openModeCard(mode.relativeShift(isFwShift));
    },
    parallel: (isFwShift) => {
      openModeCard(mode.parallelShift(isFwShift));
    },
    key: (isFwShift) => {
      openModeCard(mode.keyShift(isFwShift));
    },
    relativeBrightness: (isFwShift) => {
      openModeCard(mode.relativeBrightnessShift(isFwShift));
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
