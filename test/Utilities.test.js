const utils = require("../src/Utilities")

const octaveMod = utils.octaveMod

describe('Testing OctaveMod', () => {

  test("Returns the input modulus 12", () => {
    expect(octaveMod(3)).toBe(3);
    expect(octaveMod(13)).toBe(1);
    expect(octaveMod(-2)).toBe(10);
    expect(octaveMod(26)).toBe(2);
    expect(octaveMod(-13)).toBe(11);
  })

})