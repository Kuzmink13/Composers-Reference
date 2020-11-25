import React from 'react';

function Menu() {
  const links = [
    { title: 'About' },
    { title: 'Meet the Scales' },
    { title: 'FAQ' },
    { title: 'Contact' },
  ];

  return (
    <ul className="drop-down w-56 mt-10 mr-10 py-2">
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
