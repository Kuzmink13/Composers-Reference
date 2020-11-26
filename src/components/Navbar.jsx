import React, { useEffect, useState } from 'react';

import Menu from './Menu';
import Options from './Options';

import Keyboard from '../Keyboard';

function Navbar(props) {
  // DROP-DOWN MENU SELECTION
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);

  function optionsHandler() {
    props.isModeCardShown || setOptionsIsOpen(!optionsIsOpen);
    menuIsOpen && setMenuIsOpen(false);
  }

  function menuHandler() {
    props.isModeCardShown || setMenuIsOpen(!menuIsOpen);
    optionsIsOpen && setOptionsIsOpen(false);
  }

  function handleNavShortcuts(event) {
    event.code === 'KeyO' && optionsHandler();
    event.code === 'KeyL' && menuHandler();
  }

  useEffect(() => {
    document.addEventListener('keypress', handleNavShortcuts);
    return () => {
      document.removeEventListener('keypress', handleNavShortcuts);
    };
  });

  // CLOSE DROP-DOWN MENUS
  function closeAll() {
    setMenuIsOpen(false);
    setOptionsIsOpen(false);
  }

  function handleEscape(event) {
    Keyboard.isEscape(event.key) && closeAll();
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  // RENDER
  return (
    <header className="py-1 px-auto bg-white border-b border-gray-400">
      <div className="relative flex justify-between items-center mx-auto px-8 lg:max-w-screen-lg text-gray-800">
        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest text-center">
          COMPOSER'S REFERENCE
        </h1>

        {/* SCREEN-LOCK */}
        {(optionsIsOpen || menuIsOpen) && (
          <div
            className="fixed h-full w-full inset-0 z-20"
            onClick={closeAll}
          />
        )}

        {/* NAVIGATION BUTTONS */}
        <nav className="flex">
          {/* RESET BUTTON */}
          <button
            name="reset note selection"
            className="tab-selection p-2 text-gray-600 hover:text-gray-800 sm:mr-2"
            onClick={props.clearAll}
          >
            <svg
              className="fill-current h-5 w-5 z-30 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z" />
            </svg>
          </button>

          {/* OPTIONS BUTTON AND DROP-DOWN */}
          <button
            name="options"
            className="tab-selection p-2 text-gray-600 hover:text-gray-800 sm:mr-2"
            onClick={optionsHandler}
          >
            <svg
              className="fill-current h-5 w-5 z-30 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </button>

          {optionsIsOpen && <Options {...props} />}

          {/* MENU BUTTON AND DROP-DOWN */}
          <button
            name="menu"
            className="tab-selection p-2 text-gray-600 hover:text-gray-800"
            onClick={menuHandler}
          >
            <svg
              className="fill-current h-5 w-5 z-30 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>

          {menuIsOpen && <Menu />}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
