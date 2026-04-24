/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useEffect, Fragment } from 'react';
import { createFocusTrap } from 'focus-trap';

import svg from '../assets/svg.json';

function PopOver({
  children,
  closeFn = () => {},
  ID = 'pop-over-wrapper',
  isAnimated = true,
  isGray = true,
  isWide = false,
  overlayZClass = 'z-30',
  overridePositioning = false,
  overrideStyles = false,
  showCloseButton = false,
}) {
  // FOCUS-TRAP
  useEffect(() => {
    const container = document.getElementById(ID);

    const focusTrap = createFocusTrap(`#${ID}`, {
      allowOutsideClick: true,
      onActivate: function () {
        container.classList.add('trap', 'is-active');
      },
      onDeactivate: function () {
        container.classList.remove('is-active');
      },
    });

    focusTrap.activate();

    return () => {
      focusTrap.deactivate();
    };
  }, [ID]);

  // ANIMATE COMPONENT
  useEffect(() => {
    if (isAnimated) {
      const clickableBG = document.getElementById('clickable-bg');
      if (clickableBG && isGray) {
        clickableBG.classList.remove('bg-gray-400/0');
        clickableBG.classList.add('bg-gray-400/25');
      }

      const popOverWrapper = document.getElementById(ID);
      popOverWrapper.classList.remove('scale-95', 'opacity-0');
      popOverWrapper.classList.add('scale-100', 'opacity-100');
    }
  }, [ID, isAnimated, isGray]);

  // RENDER
  const animationClasses = isAnimated
    ? 'scale-95 opacity-0 transition delay-25 duration-50'
    : 'opacity-100';

  const popOverWrapper = (
    <div
      id={ID}
      className={`${
        !overrideStyles &&
        `box pop-out transform w-full ${isWide ? 'max-w-3xl' : 'max-w-md'}`
      }
      ${animationClasses} ${showCloseButton ? 'relative' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      {showCloseButton && (
        <button
          aria-label="close pop-over"
          name="close pop-over"
          className="absolute top-0 right-0 tab-selection p-2 m-1 text-gray-600 hover:text-gray-800"
          onClick={closeFn}
        >
          <svg
            className="h-4 w-4 fill-current cursor-pointer"
            viewBox="0 0 20 20"
          >
            <path d={svg.close} />
          </svg>
        </button>
      )}
    </div>
  );

  return (
    <Fragment>
      <div
        id="clickable-bg"
        className={`fixed inset-0 ${overlayZClass} flex justify-center items-center p-2
        ${isGray ? (isAnimated ? 'bg-gray-400/0' : 'bg-gray-400/25') : 'bg-transparent'}
        transition delay-25 duration-50`}
        onClick={closeFn}
      >
        {!overridePositioning && popOverWrapper}
      </div>
      {overridePositioning && popOverWrapper}
    </Fragment>
  );
}

export default PopOver;
