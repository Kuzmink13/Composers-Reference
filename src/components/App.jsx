/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';

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

import { KeyProvider } from '../contexts/KeyContext';
import { ModeProvider } from '../contexts/ModeContext';

import useModeCard from '../hooks/useModeCard';
import useOverlay from '../hooks/useOverlay';
import useSelectionFilter from '../hooks/useSelectionFilter';
import useClef from '../hooks/useClef';
import useTonalities from '../hooks/useTonalities';
import useScreenSize from '../hooks/useScreenSize';

import getModeLists from '../logic/getModeLists';

import { getNotesState } from '../redux/selectors';

function App({ noteProps, quickGuideProps }) {
  const [toggleFreezeKeys] = noteProps;
  const { notes, root } = useSelector(getNotesState);

  const [
    { isModeCardShown, mode },
    openModeCard,
    closeModeCard,
  ] = useModeCard();

  const [
    { areKeysShown, areNoteNamesShown },
    toggleKeys,
    toggleNoteNames,
    resetOverlay,
  ] = useOverlay();

  const [
    isSelectionFiltered,
    toggleSelectionFilter,
    resetSelectionFilter,
  ] = useSelectionFilter();

  const [
    { isGuideDismissed, isGuideShown, guideIndex },
    indexFns,
    toggleDismissGuide,
    toggleShowGuide,
    resetGuide,
  ] = quickGuideProps;

  const [clef, handleClefChange, resetClef] = useClef();
  const [tonalities, toggleTonality, resetTonalities] = useTonalities();
  const [screenHeight, screenWidth] = useScreenSize();

  // REVERT TO DEFAULT SETTINGS
  const resetSettings = (event) => {
    event.preventDefault();
    resetOverlay();
    resetSelectionFilter();
    resetGuide();
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
          {...{ isModeCardShown, isGuideShown }}
          options={
            <Options
              {...{
                ...{ areKeysShown, toggleKeys },
                ...{ areNoteNamesShown, toggleNoteNames },
                ...{ isSelectionFiltered, toggleSelectionFilter },
                ...{ clef, handleClefChange },
                ...{ tonalities, toggleTonality },
                ...{ isGuideDismissed, toggleDismissGuide },
                resetSettings,
              }}
            />
          }
          menu={<Menu {...{ toggleShowGuide }} />}
        />
      </Navbar>

      {isModeCardShown && (
        <PopOver
          closeFn={closeModeCard}
          freezeFn={toggleFreezeKeys}
          ID="mode-card-pop-over"
          showCloseButton={true}
        >
          <ModeCard
            {...{
              mode,
              clef,
              openModeCard,
            }}
          />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => toggleShowGuide()}
          freezeFn={toggleFreezeKeys}
          ID="guide-pop-over"
          isAnimated={false}
          isWide={true}
          showCloseButton={true}
        >
          <QuickGuide
            {...{
              isGuideDismissed,
              guideIndex,
              indexFns,
              toggleShowGuide,
              toggleDismissGuide,
            }}
          />
        </PopOver>
      )}

      <main className="flex-grow w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <KeyProvider
          keyProps={{
            areKeysShown,
            areNoteNamesShown,
          }}
        >
          <Keys {...{ screenWidth, screenHeight }} />
        </KeyProvider>

        <ModeProvider modeProps={{ clef, openModeCard }}>
          <ModeController {...{ modeLists }} />
        </ModeProvider>
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
