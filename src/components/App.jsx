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

import Music from '../logic/Music';
import Scales from '../logic/Scales';
import AppStorage from '../logic/AppStorage';
import Utilities from '../logic/Utilities';

const { supportedScaleLengths } = Scales;
const { tonalities } = Utilities;

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

  // SELECTED TONALITIES CONTROL
  const selectedTonalitiesDefault = () => Array.from(tonalities, () => true);
  const [selectedTonalities, setSelectedTonalities] = useState(
    AppStorage.getBooleanArray('tonalities') || selectedTonalitiesDefault()
  );

  function handleSelectedTonalityChange(tonalityIndex) {
    const isUpdating = (i) => tonalityIndex === i;
    const newSelectedTonalities = selectedTonalities.map((el, i) =>
      isUpdating(i) ? !el : el
    );

    setSelectedTonalities(newSelectedTonalities);
    AppStorage.setBooleanArray('tonalities', newSelectedTonalities);
  }

  function revertSelectedTonalities() {
    const hasSelectionChanged = () =>
      !selectedTonalitiesDefault().reduce(
        (acc, el, i) => acc && el === selectedTonalities[i],
        true
      );

    if (hasSelectionChanged()) {
      setSelectedTonalities(selectedTonalitiesDefault());
      AppStorage.removeItem('tonalities');
    }
  }

  // REVERT TO DEFAULT SETTINGS
  function handleRevertSettings(event) {
    event.preventDefault();
    resetOverlay();
    resetSelectionFilter();
    resetGuide();
    resetClef();
    revertSelectedTonalities();
  }

  // SCREEN SIZE CONTROL
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  // FILTERED LIST GENERATION
  const [filteredLists, setFilteredLists] = useState(
    Array(supportedScaleLengths.length).fill([])
  );

  useEffect(() => {
    setFilteredLists(
      Music.getFilterdLists(
        notes,
        root,
        selectedTonalities,
        isSelectionFiltered
      )
    );
  }, [notes, root, selectedTonalities, isSelectionFiltered]);

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
      selectedTonalities,
      isGuideDismissed,
      toggleKeys,
      toggleNoteNames,
      toggleSelectionFilter,
      toggleDismissGuide,
      handleClefChange,
      handleSelectedTonalityChange,
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
