/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as svg from '../assets/svg.json';

import PopOver from './PopOver';

import useNavButtons from '../hooks/useNavButtons';

import { closeDropDown, noteReset, toggleDropDown } from '../redux/actions';
import { getDropDownState } from '../redux/selectors';

import { DROP_DOWN_STATE } from '../constants';

function NavButtons({ options, menu }) {
  const dispatch = useDispatch();
  useNavButtons();

  const buttons = [
    {
      name: 'reset note selection',
      onClick: () => dispatch(noteReset()),
      path: svg.reset,
    },
    {
      name: 'options',
      onClick: () => dispatch(toggleDropDown(DROP_DOWN_STATE.OPTIONS)),
      path: svg.options,
      isOpen: useSelector(getDropDownState) === DROP_DOWN_STATE.OPTIONS,
      child: options,
    },
    {
      name: 'menu',
      onClick: () => dispatch(toggleDropDown(DROP_DOWN_STATE.MENU)),
      path: svg.menu,
      isOpen: useSelector(getDropDownState) === DROP_DOWN_STATE.MENU,
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
              closeFn={() => dispatch(closeDropDown())}
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
