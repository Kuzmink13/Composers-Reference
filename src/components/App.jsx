import React, { Fragment, useEffect, useState } from 'react';

import Navbar from './Navbar';
import PopOver from './PopOver';
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
        <PopOver closeFn={closeModeCard}>
          <ModeCard {...modeCardProps} />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => toggleShowGuide()}
          isAnimated={false}
          isWide={true}
        >
          <QuickGuide {...quickGuideProps} />
        </PopOver>
      )}

      <main className="w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys {...keysProps} />
        <ModeController {...modeControllerProps} />
      </main>
    </Fragment>
  );
}

export default App;
