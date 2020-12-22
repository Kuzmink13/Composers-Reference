import { useState, useEffect } from 'react';

import { getItem, setItem } from '../logic/storage';

function useToggle(initialState = false, storageKey = undefined) {
  const [state, setState] = useState(getItem(storageKey) || initialState);

  const toggleState = (newState = undefined) => {
    newState === undefined
      ? setState((prevState) => !prevState)
      : setState(newState);
  };

  const resetState = () => {
    setState(initialState);
  };

  useEffect(() => {
    storageKey && setItem(storageKey, state);
  }, [state, storageKey]);

  return [state, toggleState, resetState];
}

export default useToggle;
