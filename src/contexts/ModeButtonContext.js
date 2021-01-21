/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

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
