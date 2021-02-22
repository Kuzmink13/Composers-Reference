/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useState, useEffect, useCallback } from 'react';

import { BREAKPOINTS } from '../constants';

export function octavesToDisplay(screenWidth) {
  switch (true) {
    case screenWidth < BREAKPOINTS.sm:
      return 1;
    case screenWidth < BREAKPOINTS.lg:
      return 2;
    default:
      return 3;
  }
}

export function isShortModeActive(screenHeight) {
  return screenHeight < BREAKPOINTS.ht;
}

function useScreenSize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return [screenHeight, screenWidth];
}

export default useScreenSize;
