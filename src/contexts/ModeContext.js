import React, { useContext } from 'react';

const ModeContext = React.createContext();

export function useModeContext() {
  return useContext(ModeContext);
}

export function ModeProvider({ children, modeProps }) {
  return (
    <ModeContext.Provider value={modeProps}>{children}</ModeContext.Provider>
  );
}
