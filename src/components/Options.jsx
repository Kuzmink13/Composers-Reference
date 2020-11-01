import React from 'react';

function Options(props) {
  return (
    <div className="drop-down mr-16 px-4 py-2">
      <div className="py-1">
        <div onClick={props.handleNoteNamesVisible}>
          <input
            type="checkbox"
            className="mr-2"
            checked={props.areNoteNamesVisible}
          />
          Display note names on keys
        </div>
        <div>
          <input type="checkbox" className="mr-2" />
          Display scale only if its root is selected
        </div>
      </div>

      <div className="py-1">
        Clef Selection:
        <div>
          <input type="radio" name="clef" className="mx-2" />
          Treble
        </div>
        <div>
          <input type="radio" name="clef" className="mx-2" />
          Alto
        </div>
        <div>
          <input type="radio" name="clef" className="mx-2" />
          Bass
        </div>
      </div>

      <div className="py-1">
        Exclude Tonalities:
        <div>
          <input type="checkbox" className="mx-2" />
          Whole-Tone
        </div>
        <div>
          <input type="checkbox" className="mx-2" />
          Augmented
        </div>
        <div>
          <input type="checkbox" className="mx-2" />
          Major
        </div>
        <div>
          <input type="checkbox" className="mx-2" />
          Melodic Minor
        </div>
        <div>
          <input type="checkbox" className="mx-2" />
          Harmonic Minor
        </div>
        <div>
          <input type="checkbox" className="mx-2" />
          Harmonic Major
        </div>
        <div>
          <input type="checkbox" className="mx-2" />
          Diminished
        </div>
      </div>
    </div>
  );
}

export default Options;
