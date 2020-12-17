import React from 'react';

import PopOver from './PopOver';

import useNavbar from '../hooks/useNavbar';

function Navbar(props) {
  const [
    { optionsIsOpen, menuIsOpen },
    toggleOptions,
    toggleMenu,
  ] = useNavbar();

  return (
    <header className="py-1 px-auto bg-white border-b border-gray-400">
      <div className="relative flex justify-between items-center mx-auto px-4 lg:max-w-screen-lg text-gray-800">
        {/* TITLE */}
        <h1 className="sm:text-2xl font-bold tracking-widest">
          COMPOSER'S REFERENCE
        </h1>

        {/* NAVIGATION BUTTONS */}
        <nav className="flex">
          {/* RESET BUTTON */}
          <button
            name="reset note selection"
            className="tab-selection p-2 text-gray-600 hover:text-gray-800 sm:mr-2"
            onClick={props.resetNotes}
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
            onClick={toggleOptions}
          >
            <svg
              className="fill-current h-5 w-5 z-30 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </button>

          {optionsIsOpen && (
            <PopOver
              closeFn={() => toggleOptions()}
              isAnimated={false}
              isGray={false}
              overridePositioning={true}
              overrideStyles={true}
            >
              {props.options}
            </PopOver>
          )}

          {/* MENU BUTTON AND DROP-DOWN */}
          <button
            name="menu"
            className="tab-selection p-2 text-gray-600 hover:text-gray-800"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-5 w-5 z-30 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>

          {menuIsOpen && (
            <PopOver
              closeFn={() => toggleMenu()}
              isAnimated={false}
              isGray={false}
              overridePositioning={true}
              overrideStyles={true}
            >
              {props.menu}
            </PopOver>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
