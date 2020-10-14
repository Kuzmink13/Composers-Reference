const { test, expect } = require("@jest/globals")
const IntervalCollection = require("./../src/IntervalCollection")

let testConstructor = function() {
  let testCasesValid = [
    [[], [12]],
    [[12], [12]],
    [[1], [1, 11]],
    [[1, 11], [1, 11]],
    [[1, 1,], [1, 1, 10]]
  ]

  testCasesValid.forEach(([input, output]) => {
    test(`expected constructor to initialize [${input}] as [${output}]`, () => {
      let testCase = new IntervalCollection(input);
      expect(testCase.getIntervals()).toStrictEqual(output);
      expect(testCase.getNotesInScale()).toBe(output.length);
    })
  })

  let testCasesInvalid = [
    [13], [11, 2]
  ]



  testCasesInvalid.forEach(input => {
    test('expected constructor to throw error', () => {
      let testCase = function() {
        new IntervalCollection(input)
      }
      expect(testCase).toThrowError("Interval collection exceeds an octave!");
    })
  })
}

testConstructor();