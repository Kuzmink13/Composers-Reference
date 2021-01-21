import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

function Glossary() {
  return (
    <Fragment>
      <Navbar>
        <Link
          to="/"
          className="my-2 pl-5 sm:mr-5 whitespace-no-wrap
          text-sm sm:text-base font-medium hover:underline
          text-gray-700 hover:text-gray-900"
        >
          return to app
        </Link>
      </Navbar>
      <div className="text-gray-900 w-full h-full overflow-y-auto overscroll-y-auto">
        <div className="flex flex-col mx-auto px-4 pb-16 md:max-w-screen-md text-lg lg:text-xl"></div>
      </div>
    </Fragment>
  );
}

export default Glossary;
