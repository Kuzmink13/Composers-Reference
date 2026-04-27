import { z } from 'zod';

import keyMapRaw from './keyMap.json';
import notesRaw from './notes.json';
import intervalsRaw from './intervals.json';
import modePropertiesRaw from './modeProperties.json';
import externalReferencesRaw from './externalReferences.json';
import svgRaw from './svg.json';
import chordTreeRaw from './chordTree.json';

const numericKeySchema = z.string().regex(/^\d+$/);

const numericKeyRecord = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.record(numericKeySchema, valueSchema);

const toNumberKeyRecord = <T>(record: Record<string, T>): Record<number, T> => {
  const converted: Record<number, T> = {};
  for (const [key, value] of Object.entries(record)) {
    converted[Number(key)] = value;
  }
  return converted;
};

const keyMapSchema = z.object({
  noteToKey: numericKeyRecord(z.string()),
  keyToNote: z.record(z.string(), z.number().int()),
});

const noteSchema = z.object({
  absoluteName: z.string(),
  sharpName: z.string(),
  flatName: z.string(),
  enharmonics: z.record(z.string(), z.string()),
  isWhite: z.boolean(),
});

const notesSchema = numericKeyRecord(noteSchema);

const intervalSchema = z.object({
  intervalSize: z.number().int(),
  scaleDegree: z.string(),
  priority: z.object({
    asThird: z.number().int().optional(),
    asFifth: z.number().int().optional(),
    asSeventh: z.number().int().optional(),
  }),
});

const intervalsSchema = z.record(z.string(), intervalSchema);

const modePropertySchema = z.object({
  modeName: z.string(),
  parentTonality: z.string(),
  previousMode: z.string().nullable(),
  nextMode: z.string().nullable(),
});

const modePropertiesSchema = z.record(z.string(), modePropertySchema);

const externalReferencesSchema = z.record(z.string(), z.string());
const svgSchema = z.record(z.string(), z.string());

export type ChordTree = Record<string, [string, ChordTree]>;
const chordTreeSchema: z.ZodType<ChordTree> = z.record(
  z.string(),
  z.tuple([z.string(), z.lazy(() => chordTreeSchema)])
);

const parsedKeyMap = keyMapSchema.parse(keyMapRaw);
const parsedNotes = notesSchema.parse(notesRaw);

export const keyMap = {
  noteToKey: toNumberKeyRecord(parsedKeyMap.noteToKey),
  keyToNote: parsedKeyMap.keyToNote,
};

export const notes = toNumberKeyRecord(parsedNotes);
export const intervals = intervalsSchema.parse(intervalsRaw);
export const modeProperties = modePropertiesSchema.parse(modePropertiesRaw);
export const externalReferences =
  externalReferencesSchema.parse(externalReferencesRaw);
export const svg = svgSchema.parse(svgRaw);
export const chordTree = chordTreeSchema.parse(chordTreeRaw);

export type NoteInfo = z.infer<typeof noteSchema>;
export type IntervalProps = z.infer<typeof intervalSchema>;
export type ModeProperty = z.infer<typeof modePropertySchema>;
