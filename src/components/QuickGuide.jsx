import React, { useState } from 'react';

function QuickGuide(props) {
  // REMOVE CLOSE ON CLICK EFFECT
  function cancelClose(event) {
    event.stopPropagation();
  }

  // DISMISS QUICK GUIDE
  const [isChecked, setIsChecked] = useState(props.isGuideDismissed);

  function skipGuide() {
    props.toggleDismissGuide(isChecked);
    props.toggleShowGuide();
  }

  // RENDER
  return (
    <div
      className="flex flex-col items-center relative p-4"
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
    </div>
  );
}

export default QuickGuide;
