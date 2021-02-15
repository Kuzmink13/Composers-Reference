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

import { ModeProvider } from '../contexts/ModeContext';

import useModeCard from '../hooks/useModeCard';
import useClef from '../hooks/useClef';
import useTonalities from '../hooks/useTonalities';
import useScreenSize from '../hooks/useScreenSize';
import useQuickGuide from '../hooks/useQuickGuide';
import useNotes from '../hooks/useNotes';

import getModeLists from '../logic/getModeLists';

import {
  getIsGuideShown,
  getIsModeCardShown,
  getNotesState,
  getSelectionFilterState,
} from '../redux/selectors';
import {
  clearOverlays,
  closeModeCard,
  guideReset,
  resetSelectionFilter,
  toggleGuideShown,
} from '../redux/actions';

function App() {
  const dispatch = useDispatch();
  const [toggleFreezeKeys] = useNotes();
  const { notes, root } = useSelector(getNotesState);

  useModeCard();
  const isModeCardShown = useSelector(getIsModeCardShown);

  const isSelectionFiltered = useSelector(getSelectionFilterState);

  useQuickGuide();
  const isGuideShown = useSelector(getIsGuideShown);

  const [clef, handleClefChange, resetClef] = useClef();
  const [tonalities, toggleTonality, resetTonalities] = useTonalities();
  const [screenHeight, screenWidth] = useScreenSize();

  // REVERT TO DEFAULT SETTINGS
  const resetSettings = (event) => {
    event.preventDefault();
    dispatch(clearOverlays());
    dispatch(resetSelectionFilter());
    dispatch(guideReset());
    resetClef();
    resetTonalities();
  };

  // SCALE LIST GENERATION
  const modeLists = useMemo(() => {
    return getModeLists(notes, root, tonalities, isSelectionFiltered);
  }, [notes, root, tonalities, isSelectionFiltered]);

  // RENDER
  return (
    <Fragment>
      <Navbar>
        <NavButtons
          options={
            <Options
              {...{
                ...{ clef, handleClefChange },
                ...{ tonalities, toggleTonality },
                resetSettings,
              }}
            />
          }
          menu={<Menu />}
        />
      </Navbar>

      {isModeCardShown && (
        <PopOver
          closeFn={() => dispatch(closeModeCard())}
          freezeFn={toggleFreezeKeys}
          ID="mode-card-pop-over"
          showCloseButton={true}
        >
          <ModeCard
            {...{
              clef,
            }}
          />
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

        <ModeProvider modeProps={{ clef }}>
          <ModeController {...{ modeLists }} />
        </ModeProvider>
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
