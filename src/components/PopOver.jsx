import React, { useEffect, Fragment } from 'react';
import { createFocusTrap } from 'focus-trap';
import * as svg from '../assets/svg.json';

function PopOver({
  children,
  closeFn = () => {},
  freezeFn = () => {},
  ID = 'pop-over-wrapper',
  isAnimated = true,
  isGray = true,
  isWide = false,
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
      clickableBG.classList.remove('bg-opacity-0');
      clickableBG.classList.add('bg-opacity-25');

      const popOverWrapper = document.getElementById(ID);
      popOverWrapper.classList.remove('scale-95', 'opacity-0');
      popOverWrapper.classList.add('scale-100', 'opacity-100');
    }
  }, [ID, isAnimated]);

  // FREEZE KEY LISTENERS
  useEffect(() => {
    freezeFn(true);
    return () => freezeFn(false);
  }, [freezeFn]);

  // RENDER
  const popOverWrapper = (
    <div
      id={ID}
      className={`${
        !overrideStyles &&
        `box pop-out transform w-full ${isWide ? 'max-w-3xl' : 'max-w-md'}`
      }
      ${isAnimated ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
      transition delay-25 duration-50`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      {showCloseButton && (
        <button
          name="close mode-card"
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
        className={`fixed inset-0 z-30 flex justify-center items-center p-2
        ${isGray && 'bg-gray-400'}
        ${isAnimated ? 'bg-opacity-0' : 'bg-opacity-25'} 
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
