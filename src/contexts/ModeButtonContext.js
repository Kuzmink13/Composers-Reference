import React, { useContext } from 'react';

const ModeButtonContext = React.createContext();

export function useModeButtonContext() {
  return useContext(ModeButtonContext);
}

export function ModeButtonProvider({ children, modeButtonProps }) {
  return (
    <ModeButtonContext.Provider value={modeButtonProps}>
      {children}
    </ModeButtonContext.Provider>
  );
}
