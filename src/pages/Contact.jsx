/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';

function Contact() {
  const fromElements = [
    {
      title: 'Name',
      tag: 'name',
      placeholderText: 'your name...',
    },
    {
      title: 'Subject',
      tag: 'subject',
      placeholderText: 'your subject...',
    },
    {
      title: 'Email Address',
      tag: 'email',
      placeholderText: 'your email...',
    },
  ];
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
        <div className="flex flex-col mx-auto px-8 pb-16 sm:max-w-screen-sm text-lg">
          <h2 className="font-bold pt-4 xs:pt-12 text-3xl text-gray-900">
            Contact Us
          </h2>
          <form className="flex flex-col">
            <div className="flex flex-col sm:flex-row sm:align-center justify-between flex-wrap">
              {fromElements.map((el) => (
                <div
                  key={el.tag}
                  className="flex flex-col xs:flex-row sm:flex-col mt-4"
                >
                  <label
                    htmlFor={el.tag}
                    className="text-gray-800 font-bold mr-4 py-1 my-auto w-auto xs:w-40 sm:w-auto"
                  >
                    {el.title}
                  </label>
                  <input
                    type="text"
                    id={el.tag}
                    name={el.tag}
                    placeholder={el.placeholderText}
                    className="py-1 px-2 my-1 w-auto sm:w-64 xs:flex-grow leading-none border border-gray-400 rounded-md"
                  ></input>
                </div>
              ))}
            </div>

            <label htmlFor="message" className="text-gray-800 font-bold mt-8">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="write something..."
              className="py-1 px-2 mt-2 border border-gray-400 rounded-md"
            ></textarea>

            <input
              type="submit"
              value="SUBMIT"
              className="mx-auto mt-8 btn btn-p btn-text px-8"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Contact;
