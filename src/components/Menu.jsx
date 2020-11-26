import React, { useEffect } from 'react';
import { createFocusTrap } from 'focus-trap';

function Menu() {
  // FOCUS TRAP
  useEffect(() => {
    const container = document.getElementById('menu');

    const focusTrap = createFocusTrap('#menu', {
      onActivate: function () {
        container.className = 'trap is-active drop-down w-56 mt-10 mr-10 py-2';
      },
      onDeactivate: function () {
        container.className = 'trap';
      },
    });

    focusTrap.activate();

    return () => {
      focusTrap.deactivate();
    };
  });

  // RENDER
  const links = [
    { title: 'About' },
    { title: 'Meet the Scales' },
    { title: 'FAQ' },
    { title: 'Contact' },
  ];

  return (
    <ul id="menu" className="drop-down w-56 mt-10 mr-10 py-2">
      {links.map((el) => (
        <li key={el.title} className="px-4 py-2">
          <span className="tab-selection px-2 py-1 cursor-pointer" tabIndex="0">
            {el.title}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
