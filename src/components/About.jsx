/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

function About() {
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
        <div className="flex flex-col mx-auto px-4 pb-16 md:max-w-screen-md text-lg lg:text-xl">
          <h2 className="font-bold pt-12 pb-6 text-3xl text-gray-900">About</h2>
          <p className="mb-6">
            Composer's Reference is a open-source web application with a
            singular mission: to get relevant music theory constructs into the
            hands of composers, songwriters, and improvisors as quickly, and
            effortlessly, as possible.
          </p>
          <p className="mb-6">
            Composer's Reference is meant to serve as the ultimate companion app
            to the songwriting process so that users can spend less time
            figuring out which common elements will work with what they've
            already written and more time discovering the unique sounds that
            will elevate their music to the next level.
          </p>
          <p className="mb-6">
            Composer's Reference takes a lot of cues from music theory resources
            that exist on the internet today, but strives to take the content
            into the new decade with an elegant user interface that makes it
            easy to select your context and get your results without leaving a
            single webpage.
          </p>
          <p className="mb-6">
            Composer's Reference values consistency and conciseness over
            inundating users with an untenable number of possibilities. The
            scales, modes, and chords supported by Composer's Reference have
            been deliberately chosen to provide a complete sense of what's
            musically possible without undermining the practicallity of working
            with a simplified model.
          </p>
          <p className="mb-6">
            Composer's Reference, in its current form, serves as the foundation
            for a comprehensive, music theory application resource. It is
            provided under the GNU General Public Licsence v3.0. Support its
            development on{' '}
            <a
              aria-label="Support development on GitHub"
              href="https://github.com/Kuzmink13/Composers-Reference"
              target="_"
              className="external-link"
            >
              GitHub.
            </a>
          </p>
          <p className="mb-6">
            Composer's Reference is created and maintained by{' '}
            <a
              aria-label="Visit Konstantin Kuzmin's Website"
              href="https://konstantinkuzmin.com"
              target="_"
              className="external-link"
            >
              Konstantin Kuzmin
            </a>
            , a software developer and composer from Minneapolis, Minnesota.{' '}
            <Link to="/contact" className="external-link">
              Contact here.
            </Link>
          </p>
        </div>
        <p className="mb-4 text-center">
          Composer's Reference &#169; Konstantin Kuzmin 2021
        </p>
      </div>
    </Fragment>
  );
}

export default About;
