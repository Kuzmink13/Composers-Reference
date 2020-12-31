import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ toggleShowGuide }) {
  const links = [
    { title: 'About' },
    { title: 'Quick Start Guide', click: () => toggleShowGuide() },
    { title: 'Meet the Scales', link: '/Scales' },
    { title: 'FAQ' },
    { title: 'Contact' },
  ];

  return (
    <ul
      className="box pop-out drop-down
      flex flex-col
      mt-10 mr-6 py-2
      font-semibold text-sm sm:text-base"
    >
      {links.map((el) => (
        <li key={el.title} className="px-4 py-2">
          <Link
            className="tab-selection px-2 py-1 cursor-pointer hover:underline"
            tabIndex="0"
            onClick={el.click}
            to={el.link}
          >
            {el.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Menu;
