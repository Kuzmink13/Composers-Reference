/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import * as chordTree from '../assets/chordTree.json';
import * as ints from '../assets/intervals.json';

export const tree = chordTree.default;

export const maxTreeDepth = 4;

export const defaultChordProps = (mode) => {
  return {
    pitches: [0],
    intervals: [],
    scaleDegrees: ['1'],
    noteNames: [mode.getModeRoot()],
  };
};

export function getNextNoteName(mode, interval) {
  return mode.getScaleNotes()[
    mode.getAbstractPitches().indexOf(getIntervalProps(interval).intervalSize)
  ];
}

export function getIntervalProps(interval) {
  return ints.default[interval];
}

export function containsInterval(mode, interval) {
  return mode
    .getAbstractPitches()
    .includes(getIntervalProps(interval).intervalSize);
}

export function getPriorities(intervals) {
  return {
    third: getIntervalProps(intervals[0]).priority.asThird,
    fifth: getIntervalProps(intervals[1]).priority.asFifth,
    seventh: intervals[2]
      ? getIntervalProps(intervals[2]).priority.asSeventh
      : Number.MIN_VALUE,
  };
}
