import React, { useContext } from 'react';

const KeyContext = React.createContext();

export function useKeyContext() {
  return useContext(KeyContext);
}

export function KeyProvider({ children, keyProps }) {
  return <KeyContext.Provider value={keyProps}>{children}</KeyContext.Provider>;
}
