/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import { useStore } from '../zustand/hooks';
import { Link } from '@tanstack/react-router';

type MenuLink = {
  title: string;
  link: string;
  click?: () => void;
};

type MenuAction = {
  title: string;
  click: () => void;
  link?: never;
};

function Menu() {
  const toggleGuideShown = useStore((state) => state.toggleGuideShown);
  const links: Array<MenuLink | MenuAction> = [
    { title: 'About', link: '/about' },
    {
      title: 'Quick Start Guide',
      click: () => toggleGuideShown(),
    },
    { title: 'Meet the Scales', link: '/scales' },
    { title: 'References', link: '/references' },
  ];

  return (
    <ul
      className="box pop-out drop-down
      flex flex-col
      mt-10 mr-6 py-2 z-50
      font-semibold text-sm sm:text-base"
    >
      {links.map((el) => (
        <li key={el.title} className="px-4 py-2">
          {el.link ? (
            <Link
              className="tab-selection px-2 py-1 cursor-pointer hover:underline"
              tabIndex={0}
              onClick={el.click}
              to={el.link}
            >
              {el.title}
            </Link>
          ) : (
            <button
              className="tab-selection px-2 py-1 cursor-pointer hover:underline bg-transparent text-left appearance-none"
              type="button"
              onClick={() => el.click?.()}
            >
              {el.title}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Menu;
