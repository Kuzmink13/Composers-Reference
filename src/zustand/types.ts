import type { StoreApi } from 'zustand/vanilla';

import type Mode from '../objects/Mode';

export type Clef = 'treble' | 'alto' | 'bass';
export type DropDownState = 'NONE' | 'OPTIONS' | 'MENU';

export interface Cardinality {
  string: string;
  number: number;
}

export interface NotesState {
  notes: boolean[];
  root: number | undefined;
  modeList: Mode[];
}

export interface OverlayState {
  areKeysShown: boolean;
  areNoteNamesShown: boolean;
}

export interface QuickGuideState {
  isDismissed: boolean;
  isShown: boolean;
}

export interface NotesSlice {
  notes: NotesState;
  noteSelect: (noteIndex: number) => void;
  rootSelect: (noteIndex: number) => void;
  noteReset: () => void;
}

export interface GuideSlice {
  quickGuide: QuickGuideState;
  guideIndex: number;
  toggleGuideDismissed: (isDismissed?: boolean) => void;
  toggleGuideShown: (isShown?: boolean) => void;
  guideReset: () => void;
  guideIncrement: () => void;
  guideDecrement: () => void;
}

export interface ModeCardState {
  isShown: boolean;
  mode: Mode | null;
}

export interface ModeCardSlice {
  modeCard: ModeCardState;
  openModeCard: (mode: Mode) => void;
  closeModeCard: () => void;
}

export interface NavigationSlice {
  navDropDowns: DropDownState;
  toggleDropDown: (dropDownState: DropDownState) => void;
  closeDropDown: () => void;
}

export interface DisplaySlice {
  overlay: OverlayState;
  selectionFilter: boolean;
  clef: Clef;
  tonalities: boolean[];
  cardinality: Cardinality;
  toggleKeyOverlay: () => void;
  toggleNoteOverlay: () => void;
  clearOverlays: () => void;
  toggleSelectionFilter: () => void;
  resetSelectionFilter: () => void;
  changeClef: (clef: Clef) => void;
  resetClef: () => void;
  toggleTonality: (index: number) => void;
  resetTonalities: () => void;
  changeCardinality: (cardinality: Cardinality) => void;
}

export interface ViewportSlice {
  screenSize: {
    width: number;
    height: number;
  };
  updateScreenSize: () => void;
}

export type AppState = NotesSlice &
  GuideSlice &
  ModeCardSlice &
  NavigationSlice &
  DisplaySlice &
  ViewportSlice;

export interface PersistedState {
  quickGuide?: QuickGuideState;
  overlay?: OverlayState;
  selectionFilter?: boolean;
  clef?: Clef;
  tonalities?: boolean[];
}

export type StoreSet = StoreApi<AppState>['setState'];
export type StoreGet = StoreApi<AppState>['getState'];
