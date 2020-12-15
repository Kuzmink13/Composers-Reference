import { useState, useEffect, useCallback } from 'react';

const breakpoints = {
  xs: 512,
  sm: 640,
  md: 768,
  ht: 820,
  lg: 1024,
  xl: 1280,
};

export function octavesToDisplay(screenWidth) {
  console.log('calculating octaves');
  switch (true) {
    case screenWidth < breakpoints.sm:
      return 1;
    case screenWidth < breakpoints.lg:
      return 2;
    default:
      return 3;
  }
}

export function isShortModeActive(screenHeight) {
  console.log('calculating mode');
  return screenHeight < breakpoints.ht;
}

function useScreenSize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const handleResize = useCallback(() => {
    console.log('ee');
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
