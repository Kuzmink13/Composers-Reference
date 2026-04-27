/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useEffect } from 'react';
import { useStore } from '../zustand/hooks';

function useScreenSize() {
  const updateScreenSize = useStore((state) => state.updateScreenSize);

  useEffect(() => {
    const update = () => updateScreenSize();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, [updateScreenSize]);
}

export default useScreenSize;
