/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as ref from '../assets/externalReferences.json';

import Navbar from '../components/Navbar';

import { replaceSymbols } from '../logic/utilities';

const alphabetize = (a, b) => {
  return a.localeCompare(b);
};

function References() {
  return (
    <Fragment>
      <Navbar>
        <Link
          to="/"
          className="tab-selection my-2 px-1 ml-4 sm:mr-4 whitespace-no-wrap
          text-sm sm:text-base font-medium hover:underline
          text-gray-700 hover:text-gray-900"
        >
          return to app
        </Link>
      </Navbar>
      <div className="text-gray-900 w-full h-full overflow-y-auto overscroll-y-auto">
        <div className="flex flex-col mx-auto px-4 pb-16 md:max-w-screen-md text-lg lg:text-xl">
          <h2 className="font-bold pt-12 pb-6 pl-3 text-3xl text-gray-900">
            References
          </h2>
          <ul className="flex flex-col xs:flex-row flex-wrap">
            {Object.keys(ref.default)
              .sort(alphabetize)
              .filter((el) => ref.default[el] !== '')
              .map((el) => (
                <li key={el} className="px-3 pb-3 capitalize">
                  <a
                    className="tab-selection hover:underline"
                    href={ref.default[el]}
                  >
                    {replaceSymbols(el)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default References;
