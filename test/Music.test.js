const { Music } = require("../src/Music");
const { Mode } = require("../src/PitchCollection");

describe("Testing Class: Music", () => {

  test("compareModes returns true if resulting modes are identical, even with different inputs", () => {
    let mode1 = new Mode([0, 1, 3], 1);
    let mode2 = new Mode([1, 2, 4], 1);
    let testCase = Music.compareModes(mode1, mode2);
    expect(testCase).toBe(true);
  })

  test("compareModes returns false when the provided modes have different given pitch centers", () => {
    let mode1 = new Mode([0, 1, 3], 0);
    let mode2 = new Mode([0, 1, 3], 1);
    let testCase = Music.compareModes(mode1, mode2);
    expect(testCase).toBe(false);
  })

  test("compareModes returns false when the provided modes have different abstract pitches", () => {
    let mode1 = new Mode([0, 1, 3], 0);
    let mode2 = new Mode([0, 1, 4], 0);
    let testCase = Music.compareModes(mode1, mode2);
    expect(testCase).toBe(false);
  })

  test("filterModes returns empty array when no modes match the given pitch center", () => {
    let modes = [new Mode([0, 1, 3], 0), new Mode([0, 1, 3], 1), new Mode([0, 1, 4], 0)];
    let testCase = Music.filterModes(modes, 2);
    expect(testCase).toStrictEqual([]);
  })

  test("filterModes returns all elements that match the given pitch center", () => {
    let modes = [new Mode([0, 1, 3], 0), new Mode([0, 1, 3], 1), new Mode([0, 1, 4], 0)];
    let testCase = Music.filterModes(modes, 0);
    let output = [[0, 1, 3], [0, 1, 4]];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    })
  })

  test("filterModes returns new array object", () => {
    let modes = [new Mode([0, 1, 3], 0), new Mode([0, 1, 4], 0)];
    let testCase = Music.filterModes(modes, 0);
    modes.push(new Mode([0, 1, 5], 6));
    expect(testCase.length).toBe(2)
  })

  test("removeDuplicates returns an array that contains only unique modes", () => {
    let modes = [new Mode([0, 1, 3], 1), new Mode([1, 2, 4], 1), new Mode([0, 1, 4], 0)];
    let testCase = Music.removeDuplicates(modes);
    let output = [[1, 2, 4], [0, 1, 4]];

    expect(testCase.length).toBe(2);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    })
  })

  test("removeDuplicates returns a new array object", () => {
    let modes = [new Mode([0, 1, 3], 0), new Mode([0, 1, 4], 0)];
    let testCase = Music.removeDuplicates(modes);
    modes.push(new Mode([0, 1, 5], 6));
    expect(testCase.length).toBe(2)
  })

  
  test("generateModes returns all concrete modes of the pitch collection - not filtered", () => {
    let [collectionPithces, modePitches] = [[0, 3, 4, 7], [1, 4]];
    let output = [[1, 4], [4, 13], [5, 8], [8, 17]];
    let testCase = Music.generateModes(collectionPithces, modePitches);

    expect(testCase.length).toBe(4);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    })
  })

  test("generateModes returns all concrete modes of the pitch collection - filtered", () => {
    let [collectionPithces, modePitches] = [[0, 3, 4, 7], [1, 4], 1];
    let output = [[1, 4]];
    let testCase = Music.generateModes(collectionPithces, modePitches);

    expect(testCase.length).toBe(1);
    testCase.forEach((el, i) => {
      expect(el.getAbsolutePitches()).toStrictEqual(output[i]);
    })
  })

})