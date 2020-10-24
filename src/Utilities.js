/**
 * A class containing basic static methods and constants
 */
class Utilities {
  static noteNamesSharp = [
    'C',
    'C\u266F',
    'D',
    'D\u266F',
    'E',
    'F',
    'F\u266F',
    'G',
    'G\u266F',
    'A',
    'A\u266F',
    'B',
  ];

  static noteNamesFlat = [
    'C',
    'D\u266D',
    'D',
    'E\u266D',
    'E',
    'F',
    'G\u266D',
    'G',
    'A\u266D',
    'A',
    'B\u266D',
    'B',
  ];

  static tonalities = [
    [0, 2, 4, 6, 8, 10],
    [0, 3, 4, 7, 8, 11],
    [0, 2, 4, 5, 7, 9, 11],
    [0, 2, 3, 5, 7, 9, 11],
    [0, 2, 4, 5, 7, 8, 11],
    [0, 2, 3, 5, 7, 8, 11],
    [0, 1, 3, 4, 6, 7, 9, 10],
  ];

  static supportedScaleLengths = [6, 7, 8];

  static modeNames = {
    '02468a': 'Whole-Tone',

    '03478b': 'Augmented',
    '014589': 'Augmented Inverse',

    '024679b': 'Lydian',
    '024579b': 'Ionian',
    '024579a': 'Mixolydian',
    '023579a': 'Dorian',
    '023578a': 'Aeolian',
    '013578a': 'Phrygian',
    '013568a': 'Locrian',

    '024689b': 'Lydian Augmented',
    '024679a': 'Lydian Dominant',
    '024578a': 'Aeolian Dominant',
    '023579b': 'Melodic Minor',
    '013579a': 'Dorian \u266D2',
    '023568a': 'Locrian \u266E2',
    '013468a': 'Altered',

    '024589b': 'Major Augmented',
    '034679b': 'Lydian \u266F2',
    '014578a': 'Phrygian Dominant',
    '023578b': 'Harmonic Minor',
    '023679a': 'Lydian Minor',
    '013569a': 'Locrian \u266E6',
    '0134689': 'Altered Diminished',

    '034689b': 'Lydian Augmented \u266F2',
    '024578b': 'Harmonic Minor',
    '014579a': 'Mixolydian \u266D2',
    '023679b': 'Melodic Minor \u266F4',
    '013478a': 'Altered \u266E5',
    '023569a': 'Dorian \u266D5',
    '0135689': 'Locrian \uD834\uDD2B7',

    '0235689b': 'Whole-Half Diminished',
    '0134679a': 'Half-Whole Diminished',
  };

  static modeNumbers = {
    '02468a': 0,

    '03478b': 0,
    '014589': 0,

    '024679b': 0,
    '024579b': 1,
    '024579a': 2,
    '023579a': 3,
    '023578a': 4,
    '013578a': 5,
    '013568a': 6,

    '024689b': 0,
    '024679a': 1,
    '024578a': 2,
    '023579b': 3,
    '013579a': 4,
    '023568a': 5,
    '013468a': 6,

    '024589b': 0,
    '034679b': 1,
    '014578a': 2,
    '023578b': 3,
    '023679a': 4,
    '013569a': 5,
    '0134689': 6,

    '034689b': 0,
    '024578b': 1,
    '014579a': 2,
    '023679b': 3,
    '013478a': 4,
    '023569a': 5,
    '0135689': 6,

    '0235689b': 0,
    '0134679a': 0,
  };

  static circleOfFifths = [6, 1, 8, 3, 10, 5, 0, 7, 2, 9, 4, 11];

  static getCompositeShapness(pitchCenter, modeCode) {
    return this.octaveMod(
      this.circleOfFifths[pitchCenter] - this.modeNumbers[modeCode]
    );
  }

  static keyHasSharps(note, modeCode) {
    return this.notesInOctave / 2 <= this.getCompositeShapness(note, modeCode);
  }

  static notesInOctave = 12;

  static octaveMod(pitch) {
    return (
      ((pitch % this.notesInOctave) + this.notesInOctave) % this.notesInOctave
    );
  }
}

export default Utilities;
