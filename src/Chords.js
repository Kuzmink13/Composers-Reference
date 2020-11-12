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
          minorSecond: ['sus-flat-2 flat-5', {}],
          majorSecond: ['sus-2 flat-5', {}],
          minorThird: [
            'diminished triad',
            {
              diminishedSeventh: [
                'diminished 7',
                {
                  minorSecond: ['fully-diminished 7 flat-9', {}],
                  majorSecond: ['fully-diminished 9', {}],
                },
              ],
              minorSeventh: [
                'half-diminished 7',
                {
                  minorSecond: ['half-diminished 7 flat-9', {}],
                  majorSecond: ['half-diminished 9', {}],
                },
              ],
              majorSeventh: [
                'minor-major 7 flat-5',
                {
                  minorSecond: ['minor-major 7 flat-5 flat-9', {}],
                  majorSecond: ['minor-major 9 flat-5', {}],
                },
              ],
            },
          ],
          majorThird: [
            'major triad flat-5',
            {
              majorSixth: [
                '6 flat-5',
                {
                  minorSecond: ['6 flat-5 flat-9', {}],
                  majorSecond: ['6/9 flat-5', {}],
                  augmentedSecond: ['6 flat-5 sharp-9', {}],
                },
              ],
              minorSeventh: [
                'dominant 7 flat-5',
                {
                  minorSecond: ['7 flat-5 flat-9', {}],
                  majorSecond: ['9 flat-5', {}],
                  augmentedSecond: ['7 flat-5 sharp-9', {}],
                },
              ],
              majorSeventh: [
                'major 7 flat-5',
                {
                  minorSecond: ['major 7 flat-5 flat-9', {}],
                  majorSecond: ['major 9 flat-5', {}],
                  augmentedSecond: ['major 7 flat-5 sharp-9', {}],
                },
              ],
            },
          ],
          perfectFourth: ['sus-4 flat-5', {}],
        },
      ],
      perfectFifth: [
        '',
        {
          minorSecond: ['sus-flat-2', {}],
          majorSecond: ['sus-2', {}],
          minorThird: [
            'minor triad',
            {
              majorSixth: [
                'minor 6',
                {
                  minorSecond: ['minor 6 flat-9', {}],
                  majorSecond: ['minor 6/9', {}],
                },
              ],
              minorSeventh: [
                'minor 7',
                {
                  minorSecond: ['minor 7 flat-9', {}],
                  majorSecond: ['minor 9', {}],
                },
              ],
              majorSeventh: [
                'minor-major 7',
                {
                  minorSecond: ['minor-major 7 flat-9', {}],
                  majorSecond: ['minor-major 9', {}],
                },
              ],
            },
          ],
          majorThird: [
            'major triad',
            {
              majorSixth: [
                '6',
                {
                  minorSecond: ['6 flat-9', {}],
                  majorSecond: ['6/9', {}],
                  augmentedSecond: ['6 sharp-9', {}],
                },
              ],
              minorSeventh: [
                'dominant 7',
                {
                  minorSecond: ['7 flat-9', {}],
                  majorSecond: ['9', {}],
                  augmentedSecond: ['7 sharp-9', {}],
                },
              ],
              majorSeventh: [
                'major 7',
                {
                  minorSecond: ['major 7 flat-9', {}],
                  majorSecond: ['major 9', {}],
                  augmentedSecond: ['major 7 sharp-9', {}],
                },
              ],
            },
          ],
          perfectFourth: ['sus-4', {}],
          augmentedFourth: ['sus-sharp-4', {}],
        },
      ],
      augmentedFifth: [
        '',
        {
          minorSecond: ['sus-flat-2 sharp-5', {}],
          majorSecond: ['sus-2 sharp-5', {}],
          minorThird: [
            'minor sharp-5',
            {
              majorSixth: [
                'minor 6 sharp-5',
                {
                  minorSecond: ['minor 6 sharp-5 flat-9', {}],
                  majorSecond: ['minor 6/9 sharp-5', {}],
                },
              ],
              minorSeventh: [
                'minor 7 sharp-5',
                {
                  minorSecond: ['minor 7 sharp-5 flat-9', {}],
                  majorSecond: ['minor 9 sharp-5', {}],
                },
              ],
              majorSeventh: [
                'minor-major 7 sharp-5',
                {
                  minorSecond: ['minor-major 7 sharp-5 flat-9', {}],
                  majorSecond: ['minor-major 9 sharp-5', {}],
                },
              ],
            },
          ],
          majorThird: [
            'augmented triad',
            {
              majorSixth: [
                'augmented 6',
                {
                  minorSecond: ['augmented 6 flat-9', {}],
                  majorSecond: ['augmented 6/9', {}],
                  augmentedSecond: ['augmented 6 sharp-9', {}],
                },
              ],
              minorSeventh: [
                '7 sharp-5',
                {
                  minorSecond: ['7 sharp-5 flat-9', {}],
                  majorSecond: ['9 sharp-5', {}],
                  augmentedSecond: ['7 sharp-5 sharp-9', {}],
                },
              ],
              majorSeventh: [
                'major 7 sharp-5',
                {
                  minorSecond: ['major 7 sharp-5 flat-9', {}],
                  majorSecond: ['major 9 sharp-5', {}],
                  augmentedSecond: ['major 7 sharp-5 sharp-9', {}],
                },
              ],
            },
          ],
          perfectFourth: ['sus-4 sharp-5', {}],
          augmentedFourth: ['sus-sharp-4 sharp-5', {}],
        },
      ],
    };
  };

  static treeCrawler(absolutePitches, tree = this.chordTree()) {
    let output = [];

    const pushAndGo = (name, next) => {
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
