/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useEffect } from 'react';

import * as vs from '../logic/vexScale';
import { notesInOctave } from '../logic/utilities';
import type Mode from '../objects/Mode';
import type { Clef } from '../zustand/types';

function getOctave(clef: Clef, firstNote: string): number {
  const baseOctaves: Record<Clef, number> = {
    treble: 4,
    alto: 3,
    bass: 2,
  };

  const clefAdjustment: Record<Clef, boolean> = {
    treble: false,
    alto: firstNote[0] === 'C',
    bass: firstNote[0] === 'C' || firstNote[0] === 'D',
  };

  const isCflat = firstNote === 'Cb';

  return baseOctaves[clef] + Number(clefAdjustment[clef]) - Number(isCflat);
}

function toVexScale(mode: Mode, octave: number, clef: Clef) {
  const pitches = mode.getAbsolutePitches();
  const noteAdjustment = (note: string, i: number): number =>
    (pitches[i] >= notesInOctave && note !== 'B#') || note === 'Cb' ? 1 : 0;

  return (note: string, i: number) =>
    vs.getVFNote(note, octave + noteAdjustment(note, i), clef);
}

function generateStaff(mode: Mode, clef: Clef, elementID: string): void {
  const context = vs.getContext(elementID);
  const stave = vs.getStave().addClef(clef);
  const octave = getOctave(clef, mode.getModeRoot());
  const notes = mode.getScaleNotes().map(toVexScale(mode, octave, clef));
  const voice = vs.getVoice(notes.length).addTickables(notes);

  vs.formatVoice(voice, stave);
  stave.setContext(context).draw();
  voice.draw(context, stave);
}

function useVexScale(mode: Mode, clef: Clef, altID?: string): void {
  useEffect(() => {
    const elementID = altID ?? mode.getAbsoluteModeCode();
    const element = document.getElementById(elementID);
    if (!element) return undefined;

    generateStaff(mode, clef, elementID);

    return () => {
      const currentElement = document.getElementById(elementID);
      if (currentElement) {
        currentElement.innerHTML = '';
      }
    };
  }, [mode, clef, altID]);
}

export default useVexScale;
