import React, { useEffect, Fragment } from 'react';
import { createFocusTrap } from 'focus-trap';

function PopOver({
  children,
  closeFn,
  isAnimated = true,
  isGray = true,
  isWide = false,
  overridePositioning = false,
  overrideStyles = false,
}) {
  // FOCUS-TRAP
  useEffect(() => {
    const container = document.getElementById('pop-over-wrapper');

    const focusTrap = createFocusTrap('#pop-over-wrapper', {
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
  }, []);

  // ANIMATE COMPONENT
  useEffect(() => {
    if (isAnimated) {
      const clickableBG = document.getElementById('clickable-bg');
      clickableBG.classList.remove('bg-opacity-0');
      clickableBG.classList.add('bg-opacity-25');

      const popOverWrapper = document.getElementById('pop-over-wrapper');
      popOverWrapper.classList.remove('scale-95', 'opacity-0');
      popOverWrapper.classList.add('scale-100', 'opacity-100');
    }
  }, [isAnimated]);

  // RENDER
  const popOverWrapper = (
    <div
      id="pop-over-wrapper"
      className={`${
        !overrideStyles &&
        `box pop-out transform w-full ${isWide ? 'max-w-3xl' : 'max-w-md'}`
      }
      ${isAnimated ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
      transition delay-25 duration-50`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
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