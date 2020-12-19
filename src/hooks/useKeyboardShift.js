import useKeyboardFn, { keyArrays } from './useKeyboardFn';

function useKeyboardShift(shift) {
  const handleShift = (event) => {
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

  const shiftLR = (event, isFwShift) => {
    event.preventDefault();
    event.shiftKey
      ? shift.relativeBrightness(isFwShift)
      : shift.relative(isFwShift);
  };

  const shiftUD = (event, isFwShift) => {
    event.preventDefault();
    event.shiftKey ? shift.key(isFwShift) : shift.parallel(isFwShift);
  };

  useKeyboardFn(handleShift);
}

export default useKeyboardShift;
