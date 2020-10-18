import Utilities from "../Utilities";

describe('Testing OctaveMod', () => {

  test("returns the input modulus 12", () => {
    expect(Utilities.octaveMod(3)).toBe(3);
    expect(Utilities.octaveMod(13)).toBe(1);
    expect(Utilities.octaveMod(-2)).toBe(10);
    expect(Utilities.octaveMod(26)).toBe(2);
    expect(Utilities.octaveMod(-13)).toBe(11);
  })

})