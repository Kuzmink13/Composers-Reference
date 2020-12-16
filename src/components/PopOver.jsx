import React, { useEffect } from 'react';
import { createFocusTrap } from 'focus-trap';

function PopOver({ children, closeFn, fadesIn = true, isGray = true }) {
  // FOCUS-TRAP
  useEffect(() => {
    const container = document.getElementById('clickable-bg');

    const focusTrap = createFocusTrap('#clickable-bg', {
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
    if (fadesIn) {
      const container = document.getElementById('clickable-bg');
      container.classList.remove('bg-opacity-0');
      container.classList.add('bg-opacity-25');
    }
  }, [fadesIn]);

  // RENDER
  return (
    <div
      id="clickable-bg"
      className={`fixed inset-0 z-30 flex justify-center items-center p-2
      ${isGray && 'bg-gray-400'}
      ${fadesIn ? 'bg-opacity-0' : 'bg-opacity-25'} 
      transition delay-25 duration-50`}
      onClick={closeFn}
    >
      <div className="box pop-out" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default PopOver;
