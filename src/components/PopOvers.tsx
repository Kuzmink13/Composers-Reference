/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useStore } from '../zustand/hooks';

import PopOver from './PopOver';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';

import useKeyboardFn from '../hooks/useKeyboardFn';
import { KEY_ARRAYS } from '../constants';

function PopOvers() {
  const closeModeCard = useStore((state) => state.closeModeCard);
  const toggleGuideShown = useStore((state) => state.toggleGuideShown);
  const isModeCardShown = useStore((state) => state.modeCard.isShown);
  const isGuideShown = useStore((state) => state.quickGuide.isShown);
  useKeyboardFn(() => closeModeCard(), KEY_ARRAYS.escape);
  useKeyboardFn(() => toggleGuideShown(false), KEY_ARRAYS.escape);

  return (
    <>
      {isModeCardShown && (
        <PopOver
          closeFn={() => closeModeCard()}
          ID="mode-card-pop-over"
          overlayZClass="z-[60]"
          showCloseButton={true}
        >
          <ModeCard />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => toggleGuideShown()}
          ID="guide-pop-over"
          isAnimated={false}
          isWide={true}
          overlayZClass="z-[60]"
          showCloseButton={true}
        >
          <QuickGuide />
        </PopOver>
      )}
    </>
  );
}

export default PopOvers;
