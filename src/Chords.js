import Utilities from './Utilities';

class Chords {
  static intervals = {
    minorSecond: 1,
    majorSecond: 2,
    augmentedSecond: 3,
    minorThird: 3,
    majorThird: 4,
    perfectFourth: 5,
    augmentedFourth: 6,
    diminishedFifth: 6,
    perfectFifth: 7,
    augmentedFifth: 8,
    minorSixth: 8,
    majorSixth: 9,
    diminishedSeventh: 9,
    minorSeventh: 10,
    majorSeventh: 11,
  };

  static chordTree = () => {
    return {
      diminishedFifth: [
        '',
        {
          minorSecond: ['susb2 (b5)', {}],
          majorSecond: ['sus2 (b5)', {}],
          minorThird: [
            'diminished',
            {
              diminishedSeventh: [
                'diminished7',
                {
                  minorSecond: ['diminished7 (b9)', {}],
                  majorSecond: ['diminished9', {}],
                },
              ],
              minorSeventh: [
                'half-diminished7',
                {
                  minorSecond: ['half-diminished7 (b9)', {}],
                  majorSecond: ['half-diminished9', {}],
                },
              ],
              majorSeventh: [
                'm-maj7 (b5)',
                {
                  minorSecond: ['m-maj7 (b5) (b9)', {}],
                  majorSecond: ['m-maj9 (b5)', {}],
                },
              ],
            },
          ],
          majorThird: [
            ' (b5)',
            {
              majorSixth: [
                '6 (b5)',
                {
                  minorSecond: ['6 (b5) (b9)', {}],
                  majorSecond: ['6/9 (b5)', {}],
                  augmentedSecond: ['6 (b5) (#9)', {}],
                },
              ],
              minorSeventh: [
                '7 (b5)',
                {
                  minorSecond: ['7 (b5) (b9)', {}],
                  majorSecond: ['9 (b5)', {}],
                  augmentedSecond: ['7 (b5) (#9)', {}],
                },
              ],
              majorSeventh: [
                'maj7 (b5)',
                {
                  minorSecond: ['maj7 (b5) (b9)', {}],
                  majorSecond: ['maj9 (b5)', {}],
                  augmentedSecond: ['maj7 (b5) (#9)', {}],
                },
              ],
            },
          ],
          perfectFourth: ['sus4 (b5)', {}],
        },
      ],
      perfectFifth: [
        '',
        {
          minorSecond: ['susb2', {}],
          majorSecond: ['sus2', {}],
          minorThird: [
            'm',
            {
              majorSixth: [
                'm6',
                {
                  minorSecond: ['m6 (b9)', {}],
                  majorSecond: ['m6/9', {}],
                },
              ],
              minorSeventh: [
                'm7',
                {
                  minorSecond: ['m7 (b9)', {}],
                  majorSecond: ['m9', {}],
                },
              ],
              majorSeventh: [
                'm-maj7',
                {
                  minorSecond: ['m-maj7 (b9)', {}],
                  majorSecond: ['m-maj9', {}],
                },
              ],
            },
          ],
          majorThird: [
            ' ',
            {
              majorSixth: [
                '6',
                {
                  minorSecond: ['6 (b9)', {}],
                  majorSecond: ['6/9', {}],
                  augmentedSecond: ['6 (#9)', {}],
                },
              ],
              minorSeventh: [
                '7',
                {
                  minorSecond: ['7 (b9)', {}],
                  majorSecond: ['9', {}],
                  augmentedSecond: ['7 (#9)', {}],
                },
              ],
              majorSeventh: [
                'maj7',
                {
                  minorSecond: ['maj7 (b9)', {}],
                  majorSecond: ['maj9', {}],
                  augmentedSecond: ['maj7 (#9)', {}],
                },
              ],
            },
          ],
          perfectFourth: ['sus4', {}],
          augmentedFourth: ['sus#4', {}],
        },
      ],
      augmentedFifth: [
        '',
        {
          minorSecond: ['susb2 (#5)', {}],
          majorSecond: ['sus2 (#5)', {}],
          minorThird: [
            'm (#5)',
            {
              majorSixth: [
                'm6 (#5)',
                {
                  minorSecond: ['m6 (#5) (b9)', {}],
                  majorSecond: ['m6/9 (#5)', {}],
                },
              ],
              minorSeventh: [
                'm7 (#5)',
                {
                  minorSecond: ['m7 (#5) (b9)', {}],
                  majorSecond: ['m9 (#5)', {}],
                },
              ],
              majorSeventh: [
                'm-maj7 (#5)',
                {
                  minorSecond: ['m-maj7 (#5) (b9)', {}],
                  majorSecond: ['m-maj9 (#5)', {}],
                },
              ],
            },
          ],
          majorThird: [
            '+',
            {
              majorSixth: [
                '+6',
                {
                  minorSecond: ['+6 (b9)', {}],
                  majorSecond: ['+6/9', {}],
                  augmentedSecond: ['+6 (#9)', {}],
                },
              ],
              minorSeventh: [
                '7 (#5)',
                {
                  minorSecond: ['7 (#5) (b9)', {}],
                  majorSecond: ['9 (#5)', {}],
                  augmentedSecond: ['7 (#5) (#9)', {}],
                },
              ],
              majorSeventh: [
                'maj7 (#5)',
                {
                  minorSecond: ['maj7 (#5) (b9)', {}],
                  majorSecond: ['maj9 (#5)', {}],
                  augmentedSecond: ['maj7 (#5) (#9)', {}],
                },
              ],
            },
          ],
          perfectFourth: ['sus4 (#5)', {}],
          augmentedFourth: ['sus#4 (#5)', {}],
        },
      ],
    };
  };

  static treeCrawler(absolutePitches, tree = this.chordTree()) {
    let output = [];

    const pushAndGo = (name, next) => {
      name = Utilities.replaceSymbols(name);
      name && output.push(name);
      output = output.concat(this.treeCrawler(absolutePitches, next));
    };

    Object.entries(tree).forEach(([int, [name, next]]) => {
      absolutePitches.includes(this.intervals[int]) && pushAndGo(name, next);
    });

    return output;
  }
}

export default Chords;
