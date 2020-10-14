class IntervalCollection {
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