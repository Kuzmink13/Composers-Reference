import React, { useState } from 'react';

function QuickGuide(props) {
  // REMOVE CLOSE ON CLICK EFFECT
  function cancelClose(event) {
    event.stopPropagation();
  }

  // DISMISS QUICK GUIDE
  const [isChecked, setIsChecked] = useState(props.isGuideDismissed);

  function skipGuide() {
    props.handleDismissGuide(isChecked);
    props.toggleShowGuide();
  }

  // RENDER
  return (
    <div
      className="box pop-out
      flex flex-col relative items-center
      w-full max-w-3xl m-auto p-4"
      onClick={cancelClose}
    >
      <h2 className="text-lg font-bold text-gray-800 tracking-wider mb-64">
        QUICK START GUIDE
      </h2>

      {/* BUTTONS */}
      <div className="flex flex-col-reverse xs:flex-row w-full justify-between items-center">
        <div className="flex items-center pb-1 mx-2 mt-3 xs:mt-0">
          <button
            name="skip quick start guide"
            className="btn btn-text btn-p mx-2"
            onClick={skipGuide}
          >
            SKIP
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
          <button name="previous slide" className="btn btn-text btn-p mx-2">
            PREV.
          </button>
          <button name="next slide" className="btn btn-text btn-p mx-2">
            NEXT
          </button>
        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button
        name="close mode-card"
        className="absolute top-0 right-0 tab-selection p-2 m-1 text-gray-600 hover:text-gray-800"
        onClick={props.toggleShowGuide}
      >
        <svg
          className="h-4 w-4 fill-current cursor-pointer"
          viewBox="0 0 20 20"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </button>
    </div>
  );
}

export default QuickGuide;
