/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GuideContent, { numPages } from './GuideContent';

import useKeyboarFn from '../hooks/useKeyboardFn';

import { getGuideIndex, getIsGuideDismissed } from '../redux/selectors';
import {
  guideDecrement,
  guideIncrement,
  toggleGuideDismissed,
  toggleGuideShown,
} from '../redux/actions';

import { KEY_ARRAYS } from '../constants';

function QuickGuide() {
  const dispatch = useDispatch();
  const isDismissed = useSelector(getIsGuideDismissed);
  const index = useSelector(getGuideIndex);
  const [isChecked, setIsChecked] = useState(isDismissed);

  const skipGuide = () => {
    dispatch(toggleGuideDismissed(isChecked));
    dispatch(toggleGuideShown());
  };

  const inc = () => dispatch(guideIncrement());
  const dec = () => dispatch(guideDecrement());

  useKeyboarFn(inc, KEY_ARRAYS.right);
  useKeyboarFn(dec, KEY_ARRAYS.left);

  return (
    <div className="flex flex-col items-center relative p-4">
      {/* CONTENT */}
      <GuideContent key={index} />

      {/* BUTTONS */}
      <div className="flex flex-col-reverse xs:flex-row w-full justify-between items-center">
        <div className="flex items-center pb-1 mx-2">
          <button
            aria-label="skip quick start guide"
            name="skip quick start guide"
            className="tab-selection p-1"
            onClick={skipGuide}
          >
            <div className="btn btn-text btn-p">SKIP</div>
          </button>
          <input
            id="dismiss"
            type="checkbox"
            className="mx-2 cursor-pointer"
            onChange={() => setIsChecked(!isChecked)}
            checked={isChecked}
          />
          <label
            htmlFor="dismiss"
            className="cursor-pointer whitespace-no-wrap"
          >
            Don't Show Again
          </label>
        </div>

        <div>
          <button
            aria-label="previous slide"
            name="previous slide"
            className="tab-selection p-1 disabled:opacity-50"
            onClick={dec}
            disabled={index === 0}
          >
            <div className="btn btn-text btn-p">PREV.</div>
          </button>
          <button
            aria-label="next slide"
            name="next slide"
            className="tab-selection p-1 disabled:opacity-50"
            onClick={inc}
            disabled={index === numPages - 1}
          >
            <div className="btn btn-text btn-p">NEXT</div>
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 m-2 px-1 text-sm text-gray-700">
        {index + 1}/{numPages}
      </div>
    </div>
  );
}

export default QuickGuide;
