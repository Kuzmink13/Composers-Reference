const { test, expect } = require("@jest/globals")
const music = require("../src/PitchCollection")

let PitchCollection = music.PitchCollection;
let Mode = music.Mode;

/**
 * Testing Strategy for PitchCollection constructor
 * methods: constructor, getAbstractPitches, getNoteQuantity
 * Array length: 1, 2+
 * First element: 0, <0, >0
 * Array range: <12, >12
 */
let testPitchCollectionConstructor = function() {
  let testCasesValid = [
    [[-3], [0]],
    [[0], [0]],
    [[1], [0]],
    [[-3, -2], [0, 1]],
    [[0, 3], [0, 3]],
    [[2, 7], [0, 5]]
  ]

  let testCasesInvalid = [
    [-20, -4], [-7, 8], [0, 12], [2, 16]
  ]

  testCasesValid.forEach(([input, output]) => {
    test(`expected constructor to correctly initialize PitchCollection class for [${input}]`, () => {
      let testCase = new PitchCollection(input);
      expect(testCase.getAbstractPitches()).toStrictEqual(output);
      expect(testCase.getNoteQuantity()).toBe(output.length);
    })
  })

  testCasesInvalid.forEach(input => {
    test(`expected constructor to throw error when initializing PitchCollection class for [${input}]`, () => {
      let testCase = () => new PitchCollection(input);
      expect(testCase).toThrowError("Range of PitchCollection exceeds an octave!");
    })
  })
}

/**
 * Testing Strategy for PitchCollection.CreateMode
 * Pitch center: <0, 0-11, >11
 */
let testPitchCollectionCreateMode = function() {
  let inputs = [
    [[0, 1, 3], -3],
    [[0, 1, 3], 2],
    [[0, 1, 3], 13]
  ]

  inputs.forEach(([pitches, pitchCenter]) => {
    test(`expected PitchCollection.createMode to return correct Mode object for [${pitches}] and ${pitchCenter}`, () => {
      let testCase = new PitchCollection(pitches);
      let output = new Mode(pitches, pitchCenter);
      expect(testCase.createMode(pitchCenter)).toStrictEqual(output);
    })
  })
}

/**
 * Testing Strategy for PitchCollection.CreateMode
 * Match: yes, no
 * Offset: yes, no
 */
let testPitchCollectionMatchMode = function() {
  let matchInputs = [
    [[0, 2, 3, 6], [0, 3], 0, 0],
    [[0, 2, 3, 6], [0, 3], 2, -3]
  ]

  let noMatchInputs = [
    [[0, 2, 3, 6], [0, 1], 0],
    [[0, 2, 3, 6], [0, 3], 1]
  ]

  matchInputs.forEach(([pitchCol, mode, offset, pitchCenter]) => {
    test(`expected PitchCollection.matchMode to return the correct Mode object`, () => {
      let testCase = new PitchCollection(pitchCol);
      let testMode = new Mode(mode, 0)
      let output = new Mode(pitchCol, pitchCenter);
      expect(testCase.matchMode(testMode, offset)).toStrictEqual(output);
    })
  })

  noMatchInputs.forEach(([pitchCol, mode, offset]) => {
    test(`expected PitchCollection.matchMode to return false`, () => {
      let testCase = new PitchCollection(pitchCol);
      let testMode = new Mode(mode, 0)
      expect(testCase.matchMode(testMode, offset)).toBe(false);
    })
  })
}

/**
 * Testing Strategy for Mode constructor
 * methods: constructor, getAbstractPitches, getNoteQuantity, getAbsolutePitches, getPitchCenter
 * Array length: 1, 2+
 * First element: 0, <0, >0
 * Pitch center: <0, 0-11, >11
 * Array range: <12, >12
 */
let testModeConstructor = function() {
  let testCasesValid = [
    [[[-3], -1], [[0], [11]]],
    [[[0], 4], [[0], [4]]],
    [[[1], 15], [[0], [3]]],
    [[[-3, -2], -1], [[0, 1], [11, 12]]],
    [[[0, 3], 4], [[0, 3], [4, 7]]],
    [[[2, 7], 15], [[0, 5], [3, 8]]],
  ]

  let testCasesInvalid = [
    [[-20, -4], -1], [[-7, 8], 0], [[0, 12], 1], [[2, 16], 14]
  ]

  testCasesValid.forEach(([[inputArr, pitchCenter], [outArrAbtract, outputArrAbsolute]]) => {
    test(`expected constructor to correctly initialize Mode class for [${inputArr}] and ${pitchCenter}`, () => {
      let testCase = new Mode(inputArr, pitchCenter);
      expect(testCase.getAbstractPitches()).toStrictEqual(outArrAbtract);
      expect(testCase.getNoteQuantity()).toBe(outArrAbtract.length);
      expect(testCase.getAbsolutePitches()).toStrictEqual(outputArrAbsolute);
      expect(testCase.getPitchCenter()).toBe(outputArrAbsolute[0]);
    })
  })

  testCasesInvalid.forEach(([inputArr, pitchCenter]) => {
    test(`expected constructor to throw error when initializing Mode class for [${inputArr}] and ${pitchCenter}`, () => {
      let testCase = () => new Mode(inputArr, pitchCenter);
      expect(testCase).toThrowError("Range of PitchCollection exceeds an octave!");
    })
  })
}

testPitchCollectionConstructor();
testPitchCollectionCreateMode();
testPitchCollectionMatchMode();
testModeConstructor();