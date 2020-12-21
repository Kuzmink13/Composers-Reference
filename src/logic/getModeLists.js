import getAllModes from './getAllModes';
import Scales from './Scales';

const { supportedScaleLengths } = Scales;

function convertToPitchArray(notes) {
  return notes
    .map((el, i) => (el ? i : undefined))
    .filter((el) => el !== undefined);
}

function noteQuantityFilter(noteQuantity) {
  return (mode) => mode.getNoteQuantity() === noteQuantity;
}

function noteSelectionFilter(notes, isSelectionFiltered) {
  return (mode) => !isSelectionFiltered || notes[mode.getPitchCenter()];
}

function getModeLists(notes, root, tonalities, isSelectionFiltered) {
  return supportedScaleLengths.map((noteQuantity) =>
    getAllModes(convertToPitchArray(notes), root, tonalities)
      .filter(noteQuantityFilter(noteQuantity))
      .filter(noteSelectionFilter(notes, isSelectionFiltered))
  );
}

export default getModeLists;
