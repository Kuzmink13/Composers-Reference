import Utilities from './Utilities';

class Chords {
  static intervals = {
    minorSecond: [1, 'b2'],
    majorSecond: [2, '2'],
    augmentedSecond: [3, '#2'],
    minorThird: [3, 'b3'],
    majorThird: [4, '3'],
    perfectFourth: [5, '4'],
    augmentedFourth: [6, '#4'],
    diminishedFifth: [6, 'b5'],
    perfectFifth: [7, '5'],
    augmentedFifth: [8, '#5'],
    minorSixth: [8, 'b6'],
    majorSixth: [9, '6'],
    diminishedSeventh: [9, 'bb7'],
    minorSeventh: [10, 'b7'],
    majorSeventh: [11, '7'],
    minorNinth: [1, 'b9'],
    majorNinth: [2, '9'],
    augmentedNinth: [3, '#9'],
  };

  static fifthOrder = {
    7: 0,
    6: 1,
    8: 2,
  };

  static thirdOrder = {
    4: 0,
    3: 1,
    2: 2,
    5: 3,
    1: 4,
    6: 5,
  };

  static seventhOrder = {
    10: 0,
    11: 1,
    9: 2,
  };

  static chordTree = () => {
    return {
      minorSecond: [
        '',
        {
          diminishedFifth: ['susb2 (b5)', {}],
          perfectFifth: ['susb2', {}],
          augmentedFifth: ['susb2 (#5)', {}],
        },
      ],
      majorSecond: [
        '',
        {
          diminishedFifth: ['sus2 (b5)', {}],
          perfectFifth: ['sus2', {}],
          augmentedFifth: ['sus2 (#5)', {}],
        },
      ],
      minorThird: [
        '',
        {
          diminishedFifth: [
            'diminished',
            {
              diminishedSeventh: [
                'diminished7',
                {
                  minorNinth: ['diminished7 (b9)', {}],
                  majorNinth: ['diminished9', {}],
                },
              ],
              minorSeventh: [
                'half-diminished7',
                {
                  minorNinth: ['half-diminished7 (b9)', {}],
                  majorNinth: ['half-diminished9', {}],
                },
              ],
              majorSeventh: [
                'm-maj7 (b5)',
                {
                  minorNinth: ['m-maj7 (b5) (b9)', {}],
                  majorNinth: ['m-maj9 (b5)', {}],
                },
              ],
            },
          ],
          perfectFifth: [
            'm',
            {
              majorSixth: [
                'm6',
                {
                  minorNinth: ['m6 (b9)', {}],
                  majorNinth: ['m6/9', {}],
                },
              ],
              minorSeventh: [
                'm7',
                {
                  minorNinth: ['m7 (b9)', {}],
                  majorNinth: ['m9', {}],
                },
              ],
              majorSeventh: [
                'm-maj7',
                {
                  minorNinth: ['m-maj7 (b9)', {}],
                  majorNinth: ['m-maj9', {}],
                },
              ],
            },
          ],
          augmentedFifth: [
            'm (#5)',
            {
              majorSixth: [
                'm6 (#5)',
                {
                  minorNinth: ['m6 (#5) (b9)', {}],
                  majorNinth: ['m6/9 (#5)', {}],
                },
              ],
              minorSeventh: [
                'm7 (#5)',
                {
                  minorNinth: ['m7 (#5) (b9)', {}],
                  majorNinth: ['m9 (#5)', {}],
                },
              ],
              majorSeventh: [
                'm-maj7 (#5)',
                {
                  minorNinth: ['m-maj7 (#5) (b9)', {}],
                  majorNinth: ['m-maj9 (#5)', {}],
                },
              ],
            },
          ],
        },
      ],
      majorThird: [
        '',
        {
          diminishedFifth: [
            'maj (b5)',
            {
              majorSixth: [
                '6 (b5)',
                {
                  minorNinth: ['6 (b5) (b9)', {}],
                  majorNinth: ['6/9 (b5)', {}],
                  augmentedNinth: ['6 (b5) (#9)', {}],
                },
              ],
              minorSeventh: [
                '7 (b5)',
                {
                  minorNinth: ['7 (b5) (b9)', {}],
                  majorNinth: ['9 (b5)', {}],
                  augmentedNinth: ['7 (b5) (#9)', {}],
                },
              ],
              majorSeventh: [
                'maj7 (b5)',
                {
                  minorNinth: ['maj7 (b5) (b9)', {}],
                  majorNinth: ['maj9 (b5)', {}],
                  augmentedNinth: ['maj7 (b5) (#9)', {}],
                },
              ],
            },
          ],
          perfectFifth: [
            ' ',
            {
              majorSixth: [
                '6',
                {
                  minorNinth: ['6 (b9)', {}],
                  majorNinth: ['6/9', {}],
                  augmentedNinth: ['6 (#9)', {}],
                },
              ],
              minorSeventh: [
                '7',
                {
                  minorNinth: ['7 (b9)', {}],
                  majorNinth: ['9', {}],
                  augmentedNinth: ['7 (#9)', {}],
                },
              ],
              majorSeventh: [
                'maj7',
                {
                  minorNinth: ['maj7 (b9)', {}],
                  majorNinth: ['maj9', {}],
                  augmentedNinth: ['maj7 (#9)', {}],
                },
              ],
            },
          ],
          augmentedFifth: [
            '+',
            {
              majorSixth: [
                '+6',
                {
                  minorNinth: ['+6 (b9)', {}],
                  majorNinth: ['+6/9', {}],
                  augmentedNinth: ['+6 (#9)', {}],
                },
              ],
              minorSeventh: [
                '+7',
                {
                  minorNinth: ['+7 (b9)', {}],
                  majorNinth: ['+9', {}],
                  augmentedNinth: ['+7 (#9)', {}],
                },
              ],
              majorSeventh: [
                '+maj7',
                {
                  minorNinth: ['+maj7 (b9)', {}],
                  majorNinth: ['+maj9', {}],
                  augmentedNinth: ['+maj7 (#9)', {}],
                },
              ],
            },
          ],
        },
      ],
      perfectFourth: [
        '',
        {
          diminishedFifth: ['sus4 (b5)', {}],
          perfectFifth: ['sus4', {}],
          augmentedFifth: ['+sus4', {}],
        },
      ],
      augmentedFourth: [
        '',
        {
          perfectFifth: ['sus#4', {}],
          augmentedFifth: ['+sus#4', {}],
        },
      ],
    };
  };

  static chordGenerator(pitchCenter, modeCode, abstractPitches) {
    const tree = this.chordTree();
    const scaleDegrees = ['1'];
    const pitches = [0];

    const treeCrawler = (nextNode, scaleDegrees, pitches) => {
      let chordList = [];

      const addToChordList = (
        chordName,
        nextDegree,
        intervalSize,
        nextNode
      ) => {
        const newScaleDegrees = scaleDegrees.concat(nextDegree);
        const newPitches = pitches.concat(intervalSize);

        chordName && chordList.push([chordName, newPitches, newScaleDegrees]);

        chordList = chordList.concat(
          treeCrawler(nextNode, newScaleDegrees, newPitches)
        );
      };

      const constructNode = ([interval, [chordName, nextNode]]) => {
        const [intervalSize, nextDegree] = this.intervals[interval];

        abstractPitches.includes(intervalSize) &&
          addToChordList(chordName, nextDegree, intervalSize, nextNode);
      };

      Object.entries(nextNode).forEach(constructNode);

      return chordList;
    };

    const formatChordList = (chordList) => {
      return chordList.map(([chord, name, degrees]) => [
        Utilities.replaceSymbols(chord),

        Utilities.getBaseNotes(
          pitchCenter,
          modeCode,
          name.map((el) => el + pitchCenter)
        ).map((el) => Utilities.replaceSymbols(el)),

        degrees.map((el) => Utilities.replaceSymbols(el)),
      ]);
    };

    const chordListSorter = (a, b) => {
      const a_pitches = a[1];
      const b_pitches = b[1];
      const a_len = a_pitches.length;
      const b_len = b_pitches.length;
      const a_fifth = this.fifthOrder[a_pitches[2]];
      const b_fifth = this.fifthOrder[b_pitches[2]];
      const a_third = this.thirdOrder[a_pitches[1]];
      const b_third = this.thirdOrder[b_pitches[1]];
      const a_seventh = this.seventhOrder[a_pitches[3]] || Number.MIN_VALUE;
      const b_seventh = this.seventhOrder[b_pitches[3]] || Number.MIN_VALUE;

      if (a_fifth !== b_fifth) return a_fifth - b_fifth;
      if (a_third !== b_third) return a_third - b_third;
      if (a_len !== b_len) return a_len - b_len;
      if (a_seventh !== b_seventh) return a_seventh - b_seventh;
    };

    return formatChordList(
      treeCrawler(tree, scaleDegrees, pitches).sort(chordListSorter)
    );
  }
}

export default Chords;
