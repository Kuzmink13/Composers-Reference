import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import VexFigure from './VexFigure';

const guideContent = [
  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Welcome to Composer's Reference!
    </h3>
    <p className="mb-4">
      Composer’s Reference is a one-stop interactive tool that packages
      centuries of music theory sage wisdom into a streamlined interface focused
      on getting you what you need fast!
    </p>
    <p className="mb-4">
      Built from the ground up to seamlessly integrate into any songwriting
      workflow, Composer’s Reference was designed to be used in many ways right
      out of the box.
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Show Us What You’re Hearing…
    </h3>
    <p className="mb-4">
      To get started, Composer’s Reference needs a fragment, a collection of
      notes that represent an abstract musical idea. A fragment can be a
      deconstructed melody, a chord, or any otherwise related group of notes:
    </p>
    <VexFigure
      pitches={[0, 4, 5, 7]}
      autoMargins={true}
      showBox={false}
      mb6={false}
    />
    <p className="mb-4">
      Show us your fragment by selecting its notes on the on-screen keyboard or
      with your actual keyboard.
    </p>
    <p className="mb-4">
      Tip: You can toggle the keyboard overlay in the settings drop-down
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      The Scales are Coming!
    </h3>
    <p className="mb-4">
      When you start selecting notes, you’ll notice the bottom part of the
      screen instantly fill up with results! These are all the scales Composer’s
      Reference knows that contain your fragment!
    </p>
    <p className="mb-4">
      Now it’s time to get creative! There are many ways to work your results
      back into your music. Here’s a few ideas to get you started:
    </p>
    <ul className="list-disc px-8 pb-4">
      <li className="pb-1">
        Use your newfound scalar wisdom to write a sweet melody over your
        fragment
      </li>
      <li className="pb-1">
        See what disparate keys are related to your original idea and string
        them together to go on a musical journey around the circle of fifths
      </li>
      <li className="pb-1">
        Take a set of chord changes and turn them into fragments. Then use the
        results to improvise a dynamic solo to take your{' '}
        <span className="tracking-widest">jazz</span> to the next level
      </li>
    </ul>
    <p className="mb-4">
      Tip: To get the most out of composer’s reference,{' '}
      <Link to="./scales" className="external-link">
        click here
      </Link>{' '}
      to <i>meet the scales</i>
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Too Many Notes!
    </h3>
    <p className="mb-4">
      If you find that there are just too many scales to work with, Composer’s
      reference comes with a few ways to help narrow down what you’re looking
      for.
    </p>
    <ul className="list-disc px-8 pb-4">
      <li className="pb-1">
        Six, seven, and eight notes scales are separated into their own results
        panels. Click the buttons to toggle between them.
      </li>
      <li className="pb-1">
        You can filter for a specific key by holding down shift and selecting a
        note as usual. (long-press on mobile)
      </li>
      <li className="pb-1">
        Visit the settings drop-down to filter for scales that have a frament
        note as their tonic.
      </li>
      <li className="pb-1">
        You can filter out scale-families that you never want to see in the
        settings drop-down
      </li>
    </ul>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      We Need To Go Deeper...
    </h3>
    <p className="mb-4">
      Now it’s time to get into the heart of the composer’s reference workflow!
      Click on a scale to enter the mode-card view. Composer’s Reference will
      generate a list of tonic chords that are implied by the scale.
    </p>
    <p className="mb-4">
      If you used the scale to create a melodic idea, you can now effortlessly
      pair it with any number of chords that fit within the tonality.
    </p>
    <p className="mb-4">
      Want the chords from a neighoring scale degree? Click the left/right
      arrows (or use the arrow keys) to move between modes in your key.
      Shift-select or long-press to move to a brighter/darker mode within the
      same pitch-collection.
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Time to Get Modal!
    </h3>
    <p className="mb-4">[Placeholder text]</p>
  </Fragment>,
];

function QuickGuide(props) {
  const [isChecked, setIsChecked] = useState(props.isGuideDismissed);

  function skipGuide() {
    props.toggleDismissGuide(isChecked);
    props.toggleShowGuide();
  }

  const [index, setIndex] = useState(0);

  function incrementPage() {
    setIndex(index + 1);
  }

  function decrementPage() {
    setIndex(index - 1);
  }

  return (
    <div className="flex flex-col items-center relative p-4">
      {/* CONTENT */}
      <div
        tabIndex="0"
        className="flex flex-col px-12 pb-4 text-gray-800 text-lg focus:outline-none"
      >
        {guideContent[index]}
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
            onClick={decrementPage}
            disabled={index === 0}
          >
            <div className="btn btn-text btn-p">PREV.</div>
          </button>
          <button
            name="next slide"
            className="tab-selection p-1 disabled:opacity-50"
            onClick={incrementPage}
            disabled={index === guideContent.length - 1}
          >
            <div className="btn btn-text btn-p">NEXT</div>
          </button>
        </div>
      </div>
      <div className="absolute top-0 left-0 m-2 px-1 text-sm text-gray-600">
        {index + 1}/{guideContent.length}
      </div>
    </div>
  );
}

export default QuickGuide;
