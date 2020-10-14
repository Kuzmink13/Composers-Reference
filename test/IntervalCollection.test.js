const { test, expect } = require("@jest/globals")
const music = require("../src/IntervalCollection")

let IntervalCollection = music.IntervalCollection;
let Mode = music.Mode;

/**
 * Testing Strategy for intervalCollection
 * methods: constructor, getIntervals, getNotesInScale
 * Array length: 0, 1, 2+
 * Sum of array values: 12, 12-, 12+
 */
let testIntervalCollectionConstructor = function() {
  let testCasesValid = [
    [[], [12]],
    [[12], [12]],
    [[1], [1, 11]],
    [[1, 11], [1, 11]],
    [[1, 1,], [1, 1, 10]]
  ]

  let testCasesInvalid = [
    [13], [11, 2]
  ]

  testCasesValid.forEach(([input, output]) => {
    test(`expected constructor to correctly initialize IntervalCollection class for [${input}]`, () => {
      let testCase = new IntervalCollection(input);
      expect(testCase.getIntervals()).toStrictEqual(output);
      expect(testCase.getNotesInScale()).toBe(output.length);
    })
  })

  testCasesInvalid.forEach(input => {
    test(`expected constructor to throw error when initializing IntervalCollection class for [${input}]`, () => {
      let testCase = () => new IntervalCollection(input);
      expect(testCase).toThrowError("Interval collection exceeds an octave!");
    })
  })
}

/**
 * Testing Strategy for Mode
 * methods: constructor, getIntervals, getNotesInScale, getPitches, getPitchCenter
 * Array length: 0, 1, 2+
 * Sum of array values: 12, <12, >12
 * pitchCenter value: <0, 0 - 11, >11
 */
let testModeConstructor = function() {
  let testCasesValid = [
    [[[], -1], [[12], [11]]],
    [[[], 0], [[12], [0]]],
    [[[], 1], [[12], [1]]],
    [[[12], -1], [[12], [11]]],
    [[[12], 0], [[12], [0]]],
    [[[12], 1], [[12], [1]]],
    [[[1], -1], [[1, 11], [11, 0]]],
    [[[1], 0], [[1, 11], [0, 1]]],
    [[[1], 1], [[1, 11], [1, 2]]],
    [[[1, 11], -1], [[1, 11], [11, 0]]],
    [[[1, 11], 0], [[1, 11], [0, 1]]],
    [[[1, 11], 1], [[1, 11], [1, 2]]],
    [[[1, 1], -1], [[1, 1, 10], [11, 0, 1]]],
    [[[1, 1], 0], [[1, 1, 10], [0, 1, 2]]],
    [[[1, 1], 1], [[1, 1, 10], [1, 2, 3]]],
  ]

  let testCasesInvalid = [
    [[13], -1], [[11, 2], 1]
  ]

  testCasesValid.forEach(([input, [ints, pitches]]) => {
    test(`expected constructor to correctly initialize Mode class for [${input[0]}] and ${input[1]}`, () => {
      let testCase = new Mode(...input);
      expect(testCase.getIntervals()).toStrictEqual(ints);
      expect(testCase.getNotesInScale()).toBe(ints.length);
      expect(testCase.getPitches()).toStrictEqual(pitches);
      expect(testCase.getPitchCenter()).toBe(pitches[0]);
    })
  })

  testCasesInvalid.forEach(input => {
    test(`expected constructor to throw error when initializing Mode class for [${input[0]}] and ${input[1]}`, () => {
      let testCase = () => new Mode(...input);
      expect(testCase).toThrowError("Interval collection exceeds an octave!");
    })
  })
}

testIntervalCollectionConstructor();
testModeConstructor();