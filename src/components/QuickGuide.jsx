import React, { useState } from 'react';

import guideContent from './guideContent';

import useKeyboarFn, { keyArrays } from '../hooks/useKeyboardFn';

function QuickGuide({
  isGuideDismissed,
  guideIndex,
  indexFns,
  toggleShowGuide,
  toggleDismissGuide,
}) {
  const [isChecked, setIsChecked] = useState(isGuideDismissed);

  function skipGuide() {
    toggleDismissGuide(isChecked);
    toggleShowGuide();
  }

  useKeyboarFn(indexFns.incrementPage, keyArrays.right);
  useKeyboarFn(indexFns.decrementPage, keyArrays.left);

  return (
    <div className="flex flex-col items-center relative p-4">
      {/* CONTENT */}
      <div
        tabIndex="0"
        className="flex flex-col px-12 pb-4 text-gray-800 text-lg focus:outline-none"
      >
        {guideContent[guideIndex]}
      </div>

      {/* BUTTONS */}
      <div className="flex flex-col-reverse xs:flex-row w-full justify-between items-center">
        <div className="flex items-center pb-1 mx-2 mt-3 xs:mt-0">
          <button
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
            name="previous slide"
            className="tab-selection p-1 disabled:opacity-50"
            onClick={indexFns.decrementPage}
            disabled={guideIndex === 0}
          >
            <div className="btn btn-text btn-p">PREV.</div>
          </button>
          <button
            name="next slide"
            className="tab-selection p-1 disabled:opacity-50"
            onClick={indexFns.incrementPage}
            disabled={guideIndex === guideContent.length - 1}
          >
            <div className="btn btn-text btn-p">NEXT</div>
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 m-2 px-1 text-sm text-gray-600">
        {guideIndex + 1}/{guideContent.length}
      </div>
    </div>
  );
}

export default QuickGuide;
