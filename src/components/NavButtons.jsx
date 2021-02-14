/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as svg from '../assets/svg.json';

import PopOver from './PopOver';

import useNavButtons from '../hooks/useNavButtons';

import { noteReset } from '../redux/actions';
import { getIsGuideShown, getIsModeCardShown } from '../redux/selectors';

function NavButtons({ options, menu }) {
  const isGuideShown = useSelector(getIsGuideShown);
  const isModeCardShown = useSelector(getIsModeCardShown);
  const [
    { optionsIsOpen, menuIsOpen },
    toggleOptions,
    toggleMenu,
  ] = useNavButtons(isModeCardShown || isGuideShown);
  const dispatch = useDispatch();

  const buttons = [
    {
      name: 'reset note selection',
      onClick: () => dispatch(noteReset()),
      path: svg.reset,
    },
    {
      name: 'options',
      onClick: toggleOptions,
      path: svg.options,
      isOpen: optionsIsOpen,
      child: options,
    },
    {
      name: 'menu',
      onClick: toggleMenu,
      path: svg.menu,
      isOpen: menuIsOpen,
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
              closeFn={() => button.onClick()}
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
