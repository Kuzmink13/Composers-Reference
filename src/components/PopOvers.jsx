/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PopOver from './PopOver';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';

import useKeyboardFn from '../hooks/useKeyboardFn';

import { getIsGuideShown, getIsModeCardShown } from '../redux/selectors';
import { closeModeCard, toggleGuideShown } from '../redux/actions';

import { KEY_ARRAYS } from '../constants';

function PopOvers() {
  const dispatch = useDispatch();
  const isModeCardShown = useSelector(getIsModeCardShown);
  const isGuideShown = useSelector(getIsGuideShown);
  useKeyboardFn(() => dispatch(closeModeCard()), KEY_ARRAYS.escape);
  useKeyboardFn(() => dispatch(toggleGuideShown(false)), KEY_ARRAYS.escape);

  return (
    <Fragment>
      {isModeCardShown && (
        <PopOver
          closeFn={() => dispatch(closeModeCard())}
          ID="mode-card-pop-over"
          showCloseButton={true}
        >
          <ModeCard />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => dispatch(toggleGuideShown())}
          ID="guide-pop-over"
          isAnimated={false}
          isWide={true}
          showCloseButton={true}
        >
          <QuickGuide />
        </PopOver>
      )}
    </Fragment>
  );
}

export default PopOvers;
