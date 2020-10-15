const notesInOctave = 12;

const octaveMod = function(pitch) {
  return ((pitch % notesInOctave) + notesInOctave) % notesInOctave;
}

module.exports = {
  notesInOctave: notesInOctave,
  octaveMod: octaveMod
}