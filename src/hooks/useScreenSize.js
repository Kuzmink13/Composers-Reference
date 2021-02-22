/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { updateScreenSize } from '../redux/actions';

function useScreenSize() {
  const dispatch = useDispatch();

  useEffect(() => {
    const update = () => dispatch(updateScreenSize());
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, [dispatch]);
}

export default useScreenSize;
