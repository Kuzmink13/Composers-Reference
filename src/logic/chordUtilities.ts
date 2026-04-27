/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { chordTree, intervals } from '../assets/data';
import type { ChordTree, IntervalProps } from '../assets/data';
import type Mode from '../objects/Mode';

export interface ChordProps {
  pitches: number[];
  intervals: string[];
  scaleDegrees: string[];
  noteNames: string[];
}

export const tree: ChordTree = chordTree;

export const maxTreeDepth = 4;

export const defaultChordProps = (mode: Mode): ChordProps => {
  return {
    pitches: [0],
    intervals: [],
    scaleDegrees: ['1'],
    noteNames: [mode.getModeRoot()],
  };
};

export function getNextNoteName(mode: Mode, interval: string): string {
  return mode.getScaleNotes()[
    mode.getAbstractPitches().indexOf(getIntervalProps(interval).intervalSize)
  ];
}

export function getIntervalProps(interval: string): IntervalProps {
  return intervals[interval];
}

export function containsInterval(mode: Mode, interval: string): boolean {
  return mode
    .getAbstractPitches()
    .includes(getIntervalProps(interval).intervalSize);
}

export function getPriorities(intervals: string[]) {
  return {
    third: getIntervalProps(intervals[0]).priority.asThird ?? Number.MAX_VALUE,
    fifth: getIntervalProps(intervals[1]).priority.asFifth ?? Number.MAX_VALUE,
    seventh: intervals[2]
      ? (getIntervalProps(intervals[2]).priority.asSeventh ?? Number.MAX_VALUE)
      : Number.MIN_VALUE,
  };
}
