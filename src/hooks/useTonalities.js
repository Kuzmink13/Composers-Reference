import { useState, useEffect } from 'react';

import { getItem, setItem } from '../logic/Storage';

export const supportedTonalities = [
  { name: 'Whole-Tone', pitches: [0, 2, 4, 6, 8, 10] },
  { name: 'Augmented', pitches: [0, 3, 4, 7, 8, 11] },
  { name: 'Major', pitches: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Melodic Minor', pitches: [0, 2, 3, 5, 7, 9, 11] },
  { name: 'Harmonic Minor', pitches: [0, 2, 3, 5, 7, 8, 11] },
  { name: 'Harmonic Major', pitches: [0, 2, 4, 5, 7, 8, 11] },
  { name: 'Diminished', pitches: [0, 1, 3, 4, 6, 7, 9, 10] },
];

const initialState = {
  tonalities: Array.from(supportedTonalities, () => true),
};

const storageKey = 'tonalities';

function useTonalities() {
  const [tonalities, setTonalities] = useState(
    getItem(storageKey) || initialState.tonalities
  );

  const toggleTonality = (index) => {
    const isSelection = (i) => i === index;

    setTonalities((prevTonalities) =>
      prevTonalities.map((el, i) => (isSelection(i) ? !el : el))
    );
  };

  const isDefault = () =>
    JSON.stringify(initialState.tonalities) === JSON.stringify(tonalities);

  const resetTonalities = () => {
    !isDefault() && setTonalities(initialState.tonalities);
  };

  useEffect(() => {
    setItem(storageKey, tonalities);
  }, [tonalities]);

  return [tonalities, toggleTonality, resetTonalities];
}

export default useTonalities;
