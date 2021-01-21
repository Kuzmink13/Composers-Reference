/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import useToggle from './useToggle';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';

const initialState = {
  optionsIsOpen: false,
  menuIsOpen: false,
};

function useNavButtons(areKeysFrozen = false) {
  const [optionsIsOpen, toggleOptions, resetOptions] = useToggle(
    initialState.optionsIsOpen
  );
  const [menuIsOpen, toggleMenu, resetMenu] = useToggle(
    initialState.menuIsOpen
  );

  const handleNavShortcuts = (event) => {
    if (areKeysFrozen) return;
    switch (event.code) {
      case 'KeyO':
        toggleOptions();
        menuIsOpen && toggleMenu();
        return;
      case 'KeyL':
        toggleMenu();
        optionsIsOpen && toggleOptions();
        return;
      default:
        return;
    }
  };

  function closeAll() {
    if (areKeysFrozen) return;
    resetOptions();
    resetMenu();
  }

  useKeyboardFn(handleNavShortcuts);
  useKeyboardFn(closeAll, keyArrays.escape);

  return [{ optionsIsOpen, menuIsOpen }, toggleOptions, toggleMenu];
}

export default useNavButtons;
