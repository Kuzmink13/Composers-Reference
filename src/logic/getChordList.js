import Utilities from './Utilities';
import * as c from './chordUtilities';

function updateChordProps(mode, chordProps, interval) {
  const { intervalSize, scaleDegree } = c.getIntervalProps(interval);
  const { pitches, intervals, noteNames, scaleDegrees } = chordProps;

  return {
    pitches: [...pitches, intervalSize],
    intervals: [...intervals, interval],
    scaleDegrees: [...scaleDegrees, scaleDegree],
    noteNames: [...noteNames, c.getNextNoteName(mode, interval)],
  };
}

function constructNode(subtree, mode, chordProps) {
  const [interval, [chordName, nextNode]] = subtree;

  if (c.containsInterval(mode, interval)) {
    chordProps = updateChordProps(mode, chordProps, interval);
    return [
      { chordName, ...chordProps },
      ...treeCrawler(nextNode, mode, chordProps),
    ];
  }

  return {};
}

function treeCrawler(tree, mode, chordProps = c.defaultChordProps(mode)) {
  return Object.entries(tree).map((subtree) =>
    constructNode(subtree, mode, chordProps)
  );
}

function chordListFilter(chord) {
  return chord.chordName;
}

function chordListSorter(a, b) {
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
}

function chordListFormatter({ chordName, noteNames, scaleDegrees }) {
  return {
    chordName: Utilities.replaceSymbols(chordName),
    noteNames: noteNames.map((el) => Utilities.replaceSymbols(el)),
    scaleDegrees: scaleDegrees.map((el) => Utilities.replaceSymbols(el)),
  };
}

function getChordList(mode) {
  return treeCrawler(c.tree, mode)
    .flat(c.maxTreeDepth)
    .filter(chordListFilter)
    .sort(chordListSorter)
    .map(chordListFormatter);
}

export default getChordList;
