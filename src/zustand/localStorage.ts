import type { PersistedState } from './types';

// https://github.com/gaearon/todos/blob/04-refactoring-entry-point/src/localStorage.js

export const loadState = (): PersistedState | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as PersistedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: PersistedState): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
