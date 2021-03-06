/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleGuideShown } from '../redux/actions';

function Menu() {
  const dispatch = useDispatch();
  const links = [
    { title: 'About', link: '/about' },
    // { title: 'Contact', link: '/contact' },
    {
      title: 'Quick Start Guide',
      click: () => dispatch(toggleGuideShown()),
      link: '',
    },
    { title: 'Meet the Scales', link: '/scales' },
    { title: 'References', link: '/references' },
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
