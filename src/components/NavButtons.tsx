/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { useStore } from '../zustand/hooks';

import { svg } from '../assets/data';

import PopOver from './PopOver';

import { DROP_DOWN_STATE } from '../constants';

interface NavButtonsProps {
  options: React.ReactNode;
  menu: React.ReactNode;
}

function NavButtons({ options, menu }: NavButtonsProps) {
  const noteReset = useStore((state) => state.noteReset);
  const toggleDropDown = useStore((state) => state.toggleDropDown);
  const closeDropDown = useStore((state) => state.closeDropDown);
  const dropDownState = useStore((state) => state.navDropDowns);

  const buttons = [
    {
      name: 'reset note selection',
      onClick: () => noteReset(),
      path: svg.reset,
    },
    {
      name: 'options',
      onClick: () => toggleDropDown(DROP_DOWN_STATE.OPTIONS),
      path: svg.options,
      isOpen: dropDownState === DROP_DOWN_STATE.OPTIONS,
      child: options,
    },
    {
      name: 'menu',
      onClick: () => toggleDropDown(DROP_DOWN_STATE.MENU),
      path: svg.menu,
      isOpen: dropDownState === DROP_DOWN_STATE.MENU,
      child: menu,
    },
  ];

  return (
    <nav className="flex">
      {buttons.map((button) => (
        <Fragment key={button.name}>
          <button
            aria-label={button.name}
            name={button.name}
            className="tab-selection p-2 text-gray-600 hover:text-gray-800 sm:mr-2"
            onClick={() => button.onClick()}
          >
            <svg
              className="fill-current h-5 w-5 z-30 cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d={button.path} />
            </svg>
          </button>

          {button.child && button.isOpen && (
            <PopOver
              closeFn={() => closeDropDown()}
              isAnimated={false}
              isGray={false}
              overridePositioning={true}
              overrideStyles={true}
            >
              {button.child}
            </PopOver>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export default NavButtons;
