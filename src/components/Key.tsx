/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useStore } from '../zustand/hooks';

import { keyMap, notes as keyNotes } from '../assets/data';

import useLongPress from '../hooks/useLongPress';
import { BREAKPOINTS } from '../constants';

interface KeyProps {
  value: number;
  index: number;
}

function Key({ value, index }: KeyProps) {
  const noteSelect = useStore((state) => state.noteSelect);
  const rootSelect = useStore((state) => state.rootSelect);
  const { areKeysShown, areNoteNamesShown } = useStore((state) => state.overlay);
  const { notes, root } = useStore((state) => state.notes);
  const isShort = useStore((state) => state.screenSize.height < BREAKPOINTS.ht);

  const longPressEvent = useLongPress(
    () => rootSelect(value),
    (event) =>
      'shiftKey' in event && event.shiftKey
        ? rootSelect(value)
        : noteSelect(value)
  );

  const isKeySelected = notes[value];
  const isKeyRoot = root === value;
  const keyNoteName = keyNotes[value].absoluteName;
  const keyColor = keyNotes[value].isWhite ? 'white' : 'black';
  const selectionType = isKeySelected
    ? isKeyRoot
      ? 'root'
      : 'selected'
    : 'unselected';

  return (
    <div
      {...longPressEvent}
      className={`key key-${keyColor}${
        isShort ? '-small' : ''
      } key-${keyColor}-${selectionType} p-2 font-semibold break-words text-center`}
    >
      {areKeysShown && <div>{keyMap.noteToKey[index]}</div>}
      {areNoteNamesShown && (
        <div className={`${isShort ? 'mt-1' : 'mt-4'}`}>
          {keyNoteName.replace('/', ' ')}
        </div>
      )}
    </div>
  );
}

export default Key;
