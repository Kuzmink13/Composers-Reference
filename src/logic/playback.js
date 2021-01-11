import * as Tone from 'tone';
import { notesInOctave } from './utilities';

const synth = new Tone.Synth().toDestination();
const noteDuration = 0.33;

function playback(mode) {
  const notes = mode.getScaleNotes();
  const pitches = mode.getAbsolutePitches();
  const now = Tone.now();

  const noteAdjustment = (note, i) =>
    (pitches[i] >= notesInOctave && note !== 'B#') || note === 'Cb';

  notes.forEach((note, i) => {
    console.log(`${note}${noteAdjustment(note, i) ? '5' : '4'}`);
    synth.triggerAttackRelease(
      `${note}${noteAdjustment(note, i) ? '5' : '4'}`,
      noteDuration,
      now + i * noteDuration
    );
  });

  synth.triggerAttackRelease(
    `${mode.getModeRoot()}5`,
    noteDuration,
    now + notes.length * noteDuration
  );
}

export default playback;
