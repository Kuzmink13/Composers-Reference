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
                '+7',
                {
                  minorSecond: ['+7 (b9)', {}],
                  majorSecond: ['+9', {}],
                  augmentedSecond: ['+7 (#9)', {}],
                },
              ],
              majorSeventh: [
                '+maj7',
                {
                  minorSecond: ['+maj7 (b9)', {}],
                  majorSecond: ['+maj9', {}],
                  augmentedSecond: ['+maj7 (#9)', {}],
                },
              ],
            },
          ],
          perfectFourth: ['+sus4', {}],
          augmentedFourth: ['+sus#4', {}],
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
          name.map((el) => el + pitchCenter).sort((a, b) => a - b)
        ).map((el) => Utilities.replaceSymbols(el)),

        degrees
          .map((el) => Utilities.replaceSymbols(el))
          .sort((a, b) => Number(a.slice(-1)) - Number(b.slice(-1))),
      ]);
    };

    const chordListSorter = (a, b) => {
      const a_pitches = a[1];
      const b_pitches = b[1];
      const a_len = a_pitches.length;
      const b_len = b_pitches.length;
      const a_fifth = this.fifthOrder[a_pitches[1]];
      const b_fifth = this.fifthOrder[b_pitches[1]];
      const a_third = this.thirdOrder[a_pitches[2]];
      const b_third = this.thirdOrder[b_pitches[2]];
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
