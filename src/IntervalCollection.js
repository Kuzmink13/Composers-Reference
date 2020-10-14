const notesInOctave = 12;
const octaveMod = function(pitch) {
  return ((pitch % notesInOctave) + notesInOctave) % notesInOctave;
}

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

/**
 * A collection of successive intervals starting at a note representing a mode
 */
class Mode extends IntervalCollection {
  /**
   * Creates a new Mode object
   * @param {Array<Numbers>} intervals - an array of intervals where each interval is represented by its size in half-steps
   * @param {Number} pitchCenter - a number representing a pitch class where 0 is c, 1 is c-sharp/d-flat, ... , 11 is b;
   * @throws {Error} if the sum of the intervals is greater than the number of notes in an octave
   */
  constructor(intervals, pitchCenter) {
    super(intervals);
    let pitches = [octaveMod(pitchCenter)];

    this.getIntervals().forEach(el => {
      pitches.push(octaveMod(pitches[pitches.length - 1] + el));
    })

    this.getPitches = function() {
      return pitches.slice(0, -1)
    }

    this.getPitchCenter = function() {
      return pitches[0];
    }
  }
}

module.exports = {
  IntervalCollection: IntervalCollection,
  Mode: Mode
}