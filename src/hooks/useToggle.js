/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useState } from 'react';

function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggleState = (newState = undefined) => {
    newState === undefined
      ? setState((prevState) => !prevState)
      : setState(newState);
  };

  const resetState = () => {
    setState(initialState);
  };

  return [state, toggleState, resetState];
}

export default useToggle;
