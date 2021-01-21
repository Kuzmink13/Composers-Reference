/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

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
