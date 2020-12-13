import React, { Fragment, useEffect, useState } from 'react';

import Navbar from './Navbar';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ModeController from './ModeController';

import useNotes from '../hooks/useNotes';
import useModeCard from '../hooks/useModeCard';
import useOverlay from '../hooks/useOverlay';

import Music from '../logic/Music';
import Scales from '../logic/Scales';
import AppStorage from '../logic/AppStorage';
import Utilities from '../logic/Utilities';

const { supportedScaleLengths } = Scales;
const { tonalities, supportedClefs } = Utilities;

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

  // FILTER RESULTS BY NOTE SELECTION TOGGLE
  const isFilteredBySelectionDefault = false;
  const [isFilteredBySelection, setIsFilteredBySelection] = useState(
    AppStorage.getBoolean('selectionFilter') || isFilteredBySelectionDefault
  );

  function handleIsFilteredBySelection() {
    setIsFilteredBySelection(!isFilteredBySelection);
    AppStorage.setBoolean('selectionFilter', !isFilteredBySelection);
  }

  function revertIsFilteredBySelection() {
    setIsFilteredBySelection(isFilteredBySelectionDefault);
    AppStorage.removeItem('selectionFilter');
  }

  // CLEF SELECTION CONTROL
  const clefDefault = supportedClefs[0];
  const [clef, setClef] = useState(AppStorage.getItem('clef') || clefDefault);

  function handleClefChange(newClef) {
    setClef(newClef);
    AppStorage.setItem('clef', newClef);
  }

  function revertClef() {
    setClef(clefDefault);
    AppStorage.removeItem('clef');
  }

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

  // QUICK START GUIDE DISMISSAL
  const [isGuideDismissed, setIsGuideDismissed] = useState(
    AppStorage.getBoolean('isGuideDismissed') || false
  );

  function handleDismissGuide(setting) {
    setIsGuideDismissed(setting);
    AppStorage.setBoolean('isGuideDismissed', setting);
  }

  function revertIsGuideDismissed() {
    setIsGuideDismissed(false);
    AppStorage.removeItem('isGuideDismissed');
  }

  // QUICK START GUIDE DISPLAY
  const [isGuideShown, setIsGuideShown] = useState(!isGuideDismissed);

  function toggleShowGuide() {
    setIsGuideShown(!isGuideShown);
  }

  // REVERT TO DEFAULT SETTINGS
  function handleRevertSettings(event) {
    event.preventDefault();
    resetOverlay();
    revertIsFilteredBySelection();
    revertClef();
    revertSelectedTonalities();
    revertIsGuideDismissed();
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
        isFilteredBySelection
      )
    );
  }, [notes, root, selectedTonalities, isFilteredBySelection]);

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
      isFilteredBySelection,
      clef,
      selectedTonalities,
      isGuideDismissed,
      toggleKeys,
      toggleNoteNames,
      handleIsFilteredBySelection,
      handleClefChange,
      handleSelectedTonalityChange,
      handleRevertSettings,
      handleDismissGuide,
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
    handleDismissGuide,
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
          onClick={toggleShowGuide}
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
