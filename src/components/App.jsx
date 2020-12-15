import React, { Fragment, useEffect, useState } from 'react';

import Navbar from './Navbar';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ModeController from './ModeController';

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
  function handleRevertSettings(event) {
    event.preventDefault();
    resetOverlay();
    resetSelectionFilter();
    resetGuide();
    resetClef();
    resetTonalities();
  }

  // FILTERED LIST GENERATION
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );

  useEffect(() => {
    setFilteredLists(
      Music.getFilterdLists(notes, root, tonalities, isSelectionFiltered)
    );
  }, [notes, root, tonalities, isSelectionFiltered]);

  // MODE-CARD ANIMATION
  useEffect(() => {
    if (isModeCardShown) {
      const container = document.getElementById('grayed-out-background');

      container.classList.remove('bg-opacity-0');
      container.classList.add('bg-opacity-25');
    }
  });

  // RENDER
  const navbarProps = {
    isModeCardShown,
    toggleShowGuide,
    resetNotes,
    optionsProps: {
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
      handleRevertSettings,
    },
  };

  const modeCardProps = {
    ...modeProps,
    clef,
    showAnimation,
    openModeCard,
    closeModeCard,
  };

  const quickGuideProps = {
    isGuideDismissed,
    toggleShowGuide,
    toggleDismissGuide,
  };

  const keysProps = {
    screenWidth,
    screenHeight,
    keyProps: {
      notes,
      root,
      areKeysShown,
      areNoteNamesShown,
      handleNoteSelection,
    },
  };

  const modeControllerProps = {
    filteredLists,
    modePanelProps: {
      clef,
      openModeCard,
    },
  };

  return (
    <Fragment>
      <Navbar {...navbarProps} />

      {isModeCardShown && (
        <div
          id="grayed-out-background"
          className="fixed h-full w-full inset-0 z-30 flex bg-gray-400 bg-opacity-0 transition delay-25 duration-50 p-2"
          onClick={closeModeCard}
        >
          <ModeCard {...modeCardProps} />
        </div>
      )}

      {isGuideShown && (
        <div
          className="fixed h-full w-full inset-0 z-30 flex bg-gray-400 bg-opacity-25 p-2"
          onClick={() => toggleShowGuide()}
        >
          <QuickGuide {...quickGuideProps} />
        </div>
      )}

      <main className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys {...keysProps} />
        <ModeController {...modeControllerProps} />
      </main>
    </Fragment>
  );
}

export default App;
