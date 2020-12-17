import useToggle from './useToggle';
import useKeyboardFn, { keyArrays } from './useKeyboardFn';

const initialState = {
  optionsIsOpen: false,
  menuIsOpen: false,
};

function useNavbar() {
  const [optionsIsOpen, toggleOptions, resetOptions] = useToggle(
    initialState.optionsIsOpen
  );
  const [menuIsOpen, toggleMenu, resetMenu] = useToggle(
    initialState.menuIsOpen
  );

  function handleNavShortcuts(event) {
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
  }

  function closeAll() {
    resetOptions();
    resetMenu();
  }

  useKeyboardFn(handleNavShortcuts);
  useKeyboardFn(closeAll, keyArrays.escape);

  return [{ optionsIsOpen, menuIsOpen }, toggleOptions, toggleMenu];
}

export default useNavbar;
