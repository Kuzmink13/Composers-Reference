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

  static order(pitches) {
    const fifthOrder = {
      7: 0,
      6: 1,
      8: 2,
    };
    const thirdOrder = {
      4: 0,
      3: 1,
      2: 2,
      5: 3,
      1: 4,
      6: 5,
    };
    const seventhOrder = {
      10: 0,
      11: 1,
      9: 2,
    };

    return {
      third: thirdOrder[pitches[1]],
      fifth: fifthOrder[pitches[2]],
      seventh: seventhOrder[pitches[3]] || Number.MIN_VALUE,
    };
  }

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

  static chordGenerator(
    pitchCenter,
    modeCode,
    abstractPitches,
    absolutePitches
  ) {
    const tree = this.chordTree();

    const baseNotes = Utilities.getBaseNotes(
      pitchCenter,
      modeCode,
      absolutePitches
    );

    const pitches = [0];
    const scaleDegrees = ['1'];
    const noteNames = [baseNotes[0]];

    const treeCrawler = (nextNode, pitches, scaleDegrees, noteNames) => {
      let chordList = [];

      const addToChordList = (
        chordName,
        nextDegree,
        intervalSize,
        nextNode
      ) => {
        const newPitches = pitches.concat(intervalSize);
        const newNoteNames = noteNames.concat(
          baseNotes[abstractPitches.indexOf(intervalSize)]
        );
        const newScaleDegrees = scaleDegrees.concat(nextDegree);

        chordName &&
          chordList.push({
            chordName: chordName,
            pitches: newPitches,
            noteNames: newNoteNames,
            scaleDegrees: newScaleDegrees,
          });

        chordList = chordList.concat(
          treeCrawler(nextNode, newPitches, newScaleDegrees, newNoteNames)
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
      return chordList.map(({ chordName, noteNames, scaleDegrees }) => [
        Utilities.replaceSymbols(chordName),

        noteNames.map((el) => Utilities.replaceSymbols(el)),

        scaleDegrees.map((el) => Utilities.replaceSymbols(el)),
      ]);
    };

    const chordListSorter = (a, b) => {
      const a_order = this.order(a.pitches);
      const b_order = this.order(b.pitches);

      if (a_order.fifth !== b_order.fifth) return a_order.fifth - b_order.fifth;
      if (a_order.third !== b_order.third) return a_order.third - b_order.third;
      if (a.pitches.length !== b.pitches.length)
        return a.pitches.length - b.pitches.length;
      if (a_order.seventh !== b_order.seventh)
        return a_order.seventh - b_order.seventh;
    };

    return formatChordList(
      treeCrawler(tree, pitches, scaleDegrees, noteNames).sort(chordListSorter)
    );
  }
}

export default Chords;
