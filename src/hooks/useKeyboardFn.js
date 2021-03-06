/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useCallback, useEffect } from 'react';

function useKeyboardFn(callback, keyArray = undefined, callOnRepeat = false) {
  const keyIsPressed = useCallback(
    (key) => {
      if (!keyArray) return true;
      return keyArray.reduce((acc, cur) => acc || cur === key, false);
    },
    [keyArray]
  );

  const callFn = useCallback(
    (event) => {
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
