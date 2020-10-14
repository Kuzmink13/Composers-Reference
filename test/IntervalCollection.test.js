const { test, expect } = require("@jest/globals")
const IntervalCollection = require("./../src/IntervalCollection")

/**
 * Testing Strategy:
 * methods: constructor, getIntervals, getNotesInScale
 * Array length: 0, 1, 2+
 * Sum of array values: 12, 12-, 12+
 */
let testConstructor = function() {
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
    test(`expected constructor to initialize [${input}] as [${output}]`, () => {
      let testCase = new IntervalCollection(input);
      expect(testCase.getIntervals()).toStrictEqual(output);
      expect(testCase.getNotesInScale()).toBe(output.length);
    })
  })

  testCasesInvalid.forEach(input => {
    test('expected constructor to throw error', () => {
      let testCase = () => new IntervalCollection(input);
      expect(testCase).toThrowError("Interval collection exceeds an octave!");
    })
  })
}

testConstructor();