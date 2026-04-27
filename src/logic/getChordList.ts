/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { replaceSymbols } from './utilities';
import * as c from './chordUtilities';
import type Mode from '../objects/Mode';
import type { ChordProps } from './chordUtilities';
import type { ChordTree } from '../assets/data';

interface ChordListEntry {
  chordName: string;
  noteNames: string[];
  scaleDegrees: string[];
  pitches: number[];
  intervals: string[];
}

function updateChordProps(
  mode: Mode,
  chordProps: ChordProps,
  interval: string
): ChordProps {
  const { intervalSize, scaleDegree } = c.getIntervalProps(interval);
  const { pitches, intervals, noteNames, scaleDegrees } = chordProps;

  return {
    pitches: [...pitches, intervalSize],
    intervals: [...intervals, interval],
    scaleDegrees: [...scaleDegrees, scaleDegree],
    noteNames: [...noteNames, c.getNextNoteName(mode, interval)],
  };
}

function constructNode(
  subtree: [string, [string, ChordTree]],
  mode: Mode,
  chordProps: ChordProps
): ChordListEntry[] {
  const [interval, [chordName, nextNode]] = subtree;

  if (c.containsInterval(mode, interval)) {
    const nextChordProps = updateChordProps(mode, chordProps, interval);
    return [
      { chordName, ...nextChordProps },
      ...treeCrawler(nextNode, mode, nextChordProps).flat(),
    ];
  }

  return [];
}

function treeCrawler(
  tree: ChordTree,
  mode: Mode,
  chordProps: ChordProps = c.defaultChordProps(mode)
): ChordListEntry[][] {
  return Object.entries(tree).map((subtree) =>
    constructNode(subtree as [string, [string, ChordTree]], mode, chordProps)
  );
}

function chordListFilter(chord: ChordListEntry): boolean {
  return Boolean(chord.chordName);
}

function chordListSorter(a: ChordListEntry, b: ChordListEntry): number {
  const a_priorities = c.getPriorities(a.intervals);
  const b_priorities = c.getPriorities(b.intervals);

  // BY FIFTH TYPE
  if (a_priorities.fifth !== b_priorities.fifth)
    return a_priorities.fifth - b_priorities.fifth;
  // BY THIRD TYPE
  if (a_priorities.third !== b_priorities.third)
    return a_priorities.third - b_priorities.third;
  // BY NOTE QUANTITY
  if (a.pitches.length !== b.pitches.length)
    return a.pitches.length - b.pitches.length;
  // BY SEVENTH TYPE
  if (a_priorities.seventh !== b_priorities.seventh)
    return a_priorities.seventh - b_priorities.seventh;

  return 0;
}

function chordListFormatter({
  chordName,
  noteNames,
  scaleDegrees,
}: ChordListEntry) {
  return {
    chordName: replaceSymbols(chordName),
    noteNames: noteNames.map((el) => replaceSymbols(el)),
    scaleDegrees: scaleDegrees.map((el) => replaceSymbols(el)),
  };
}

function getChordList(mode: Mode) {
  return treeCrawler(c.tree, mode)
    .flat(c.maxTreeDepth)
    .filter(chordListFilter)
    .sort(chordListSorter)
    .map(chordListFormatter);
}

export default getChordList;
