/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import NavButtons from './NavButtons';
import Options from './Options';
import Menu from './Menu';
import PopOver from './PopOver';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ModeController from './ModeController';
import Footer from './Footer';

import useModeCard from '../hooks/useModeCard';
import useScreenSize from '../hooks/useScreenSize';
import useQuickGuide from '../hooks/useQuickGuide';
import useNotes from '../hooks/useNotes';

import getModeLists from '../logic/getModeLists';

import {
  getIsGuideShown,
  getIsModeCardShown,
  getNotesState,
  getSelectionFilterState,
  getTonalityState,
} from '../redux/selectors';
import { closeModeCard, toggleGuideShown } from '../redux/actions';

function App() {
  const dispatch = useDispatch();
  const [toggleFreezeKeys] = useNotes();
  const { notes, root } = useSelector(getNotesState);

  useModeCard();
  const isModeCardShown = useSelector(getIsModeCardShown);

  const isSelectionFiltered = useSelector(getSelectionFilterState);

  useQuickGuide();
  const isGuideShown = useSelector(getIsGuideShown);

  const tonalities = useSelector(getTonalityState);
  const [screenHeight, screenWidth] = useScreenSize();

  // SCALE LIST GENERATION
  const modeLists = useMemo(() => {
    return getModeLists(notes, root, tonalities, isSelectionFiltered);
  }, [notes, root, tonalities, isSelectionFiltered]);

  // RENDER
  return (
    <Fragment>
      <Navbar>
        <NavButtons options={<Options />} menu={<Menu />} />
      </Navbar>

      {isModeCardShown && (
        <PopOver
          closeFn={() => dispatch(closeModeCard())}
          freezeFn={toggleFreezeKeys}
          ID="mode-card-pop-over"
          showCloseButton={true}
        >
          <ModeCard />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => dispatch(toggleGuideShown())}
          freezeFn={toggleFreezeKeys}
          ID="guide-pop-over"
          isAnimated={false}
          isWide={true}
          showCloseButton={true}
        >
          <QuickGuide />
        </PopOver>
      )}

      <main className="flex-grow w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys {...{ screenWidth, screenHeight }} />

        <ModeController {...{ modeLists }} />
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
