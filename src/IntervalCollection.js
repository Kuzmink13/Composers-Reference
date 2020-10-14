/**
 * A collection of successive intervals totaling an octave;
 */
class IntervalCollection {
  /**
   * Creates a new IntervalCollection object
   * @param {Array<Numbers>} intervals - an array of intervals where each interval is represented by its size in half-steps
   * @throws {Error} if the sum of the intervals is greater than the number of notes in an octave
   */
  constructor(intervals) {
    const notesInOctave = 12;
    let ints = intervals.slice()
    let span = ints.reduce((acc, el) => acc + el, 0);

    if (span > notesInOctave) {
      throw new Error("Interval collection exceeds an octave!");
    } else if (span < notesInOctave) {
      ints.push(notesInOctave - span)
    }

    this.getIntervals = function() {
      return ints.slice();
    }
    this.getNotesInScale = function() {
      return ints.length;
    }
  }
}

module.exports = IntervalCollection;