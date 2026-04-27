/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback, useEffect } from 'react';

function useKeyboardFn(
  callback: (event: KeyboardEvent) => void,
  keyArray?: readonly string[],
  callOnRepeat = false
): void {
  const keyIsPressed = useCallback(
    (key: string): boolean => {
      if (!keyArray) return true;
      return keyArray.some((cur) => cur === key);
    },
    [keyArray]
  );

  const callFn = useCallback(
    (event: KeyboardEvent) => {
      if (!callOnRepeat && event.repeat) return;
      keyIsPressed(event.key) && callback(event);
    },
    [callOnRepeat, keyIsPressed, callback]
  );

  useEffect(() => {
    document.addEventListener('keydown', callFn);
    return () => {
      document.removeEventListener('keydown', callFn);
    };
  }, [callFn]);
}

export default useKeyboardFn;
