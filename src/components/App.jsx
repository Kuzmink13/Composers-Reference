import React, { Fragment, useCallback, useEffect, useState } from 'react';

import Navbar from './Navbar';
import Options from './Options';
import Menu from './Menu';
import PopOver from './PopOver';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ModeController from './ModeController';

import { KeyProvider } from '../contexts/KeyContext';
import { ModeProvider } from '../contexts/ModeContext';

import useNotes from '../hooks/useNotes';
import useModeCard from '../hooks/useModeCard';
import useOverlay from '../hooks/useOverlay';
import useSelectionFilter from '../hooks/useSelectionFilter';
import useQuickGuide from '../hooks/useQuickGuide';
import useClef from '../hooks/useClef';
import useTonalities from '../hooks/useTonalities';
import useScreenSize from '../hooks/useScreenSize';

import Music from '../logic/Music';
import Scales from '../logic/Scales';

const { supportedScaleLengths } = Scales;

function App() {
  const [{ notes, root }, handleNoteSelection, resetNotes] = useNotes();

  const [
    { isModeCardShown, showAnimation, modeProps },
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
    { isGuideDismissed, isGuideShown },
    toggleDismissGuide,
    toggleShowGuide,
    resetGuide,
  ] = useQuickGuide();

  const [clef, handleClefChange, resetClef] = useClef();
  const [tonalities, toggleTonality, resetTonalities] = useTonalities();
  const [screenHeight, screenWidth] = useScreenSize();

  // REVERT TO DEFAULT SETTINGS
  const resetSettings = useCallback(
    (event) => {
      event.preventDefault();
      resetOverlay();
      resetSelectionFilter();
      resetGuide();
      resetClef();
      resetTonalities();
    },
    [resetOverlay, resetSelectionFilter, resetGuide, resetClef, resetTonalities]
  );

  // FILTERED LIST GENERATION
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );

  useEffect(() => {
    setFilteredLists(
      Music.getFilterdLists(notes, root, tonalities, isSelectionFiltered)
    );
  }, [notes, root, tonalities, isSelectionFiltered]);

  // RENDER
  return (
    <Fragment>
      <Navbar
        {...{ isModeCardShown, resetNotes }}
        options={
          <Options
            {...{
              areKeysShown,
              areNoteNamesShown,
              isSelectionFiltered,
              clef,
              tonalities,
              isGuideDismissed,
              toggleKeys,
              toggleNoteNames,
              toggleSelectionFilter,
              toggleDismissGuide,
              handleClefChange,
              toggleTonality,
              resetSettings,
            }}
          />
        }
        menu={<Menu {...{ toggleShowGuide }} />}
      />

      {isModeCardShown && (
        <PopOver closeFn={closeModeCard}>
          <ModeCard
            {...{
              ...modeProps,
              clef,
              showAnimation,
              openModeCard,
              closeModeCard,
            }}
          />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => toggleShowGuide()}
          isAnimated={false}
          isWide={true}
        >
          <QuickGuide
            {...{ isGuideDismissed, toggleShowGuide, toggleDismissGuide }}
          />
        </PopOver>
      )}

      <main className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <KeyProvider
          keyProps={{
            notes,
            root,
            areKeysShown,
            areNoteNamesShown,
            handleNoteSelection,
          }}
        >
          <Keys {...{ screenWidth, screenHeight }} />
        </KeyProvider>

        <ModeProvider modeProps={{ clef, openModeCard }}>
          <ModeController {...{ filteredLists }} />
        </ModeProvider>
      </main>
    </Fragment>
  );
}

export default App;
