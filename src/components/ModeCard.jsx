import React, { useEffect } from 'react';
import useLongPress from '../hooks/useLongPress';
import { createFocusTrap } from 'focus-trap';

import VexStaff from './VexStaff';
import ChordTable from './ChordTable';

import Music from '../logic/Music';
import Keyboard from '../logic/Keyboard';

function ModeCard(props) {
  // FOCUS TRAP
  useEffect(() => {
    const container = document.getElementById('mode-card');

    const focusTrap = createFocusTrap('#mode-card', {
      allowOutsideClick: true,
      onActivate: function () {
        container.classList.add('trap', 'is-active');
      },
      onDeactivate: function () {
        container.classList.remove('is-active');
      },
    });

    focusTrap.activate();

    return () => {
      focusTrap.deactivate();
    };
  });

  // REMOVE CLOSE ON CLICK EFFECT
  function cancelClose(event) {
    event.stopPropagation();
  }

  // ANIMATION
  useEffect(() => {
    if (props.showAnimation) {
      const container = document.getElementById('mode-card');
      container.classList.remove('scale-95', 'opacity-0');
      container.classList.add('scale-100', 'opacity-100');
    }
  });

  // MODE-SHIFT FUNCTIONS
  const shift = {
    relative: (forwardShift) => {
      props.getCard(
        Music.relativeShift(props.absolutePitches, forwardShift),
        false
      );
    },
    parallel: (forwardShift) => {
      props.getCard(
        Music.parallelShift(props.modeCode, props.pitchCenter, forwardShift),
        false
      );
    },
    key: (forwardShift) => {
      props.getCard(Music.keyShift(props.absolutePitches, forwardShift), false);
    },
    relativeBrightness: (forwardShift) => {
      props.getCard(
        Music.relativeBrightnessShift(
          props.modeCode,
          props.pitchCenter,
          props.abstractPitches,
          forwardShift
        ),
        false
      );
    },
  };

  // MODE-SHIFT KEYBOARD EVENTS
  function handleShift(event) {
    if (Keyboard.isLeftRightArrow(event.key)) {
      const forwardShift = Keyboard.isRightArrow(event.key);
      event.shiftKey
        ? shift.relativeBrightness(forwardShift)
        : shift.relative(forwardShift);
    } else if (Keyboard.isUpDownArrow(event.key)) {
      event.preventDefault();
      const forwardShift = Keyboard.isUpArrow(event.key);
      event.shiftKey ? shift.key(forwardShift) : shift.parallel(forwardShift);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleShift);
    return () => {
      document.removeEventListener('keydown', handleShift);
    };
  });

  // MODE-SHIFT BUTTON PROPERTIES
  const buttons = [
    {
      name: 'ArrowLeft',
      clicks: useLongPress(
        () => shift.relativeBrightness(false),
        () => shift.relative(false)
      ),
      path:
        'M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z',
    },
    {
      name: 'ArrowDown',
      clicks: useLongPress(
        () => shift.key(false),
        () => shift.parallel(false)
      ),
      path:
        'M9 16.172l-6.071-6.071-1.414 1.414L10 20l.707-.707 7.778-7.778-1.414-1.414L11 16.172V0H9z',
    },
    {
      name: 'ArrowUp',
      clicks: useLongPress(
        () => shift.key(true),
        () => shift.parallel(true)
      ),
      path:
        'M9 3.828L2.929 9.899 1.515 8.485 10 0l.707.707 7.778 7.778-1.414 1.414L11 3.828V20H9V3.828z',
    },
    {
      name: 'ArrowRight',
      clicks: useLongPress(
        () => shift.relativeBrightness(true),
        () => shift.relative(true)
      ),
      path:
        'M16.172 9l-6.071-6.071 1.414-1.414L20 10l-.707.707-7.778 7.778-1.414-1.414L16.172 11H0V9z',
    },
  ];

  // RENDER
  return (
    <div
      onClick={cancelClose}
      id="mode-card"
      className={`box pop-out 
                  flex flex-col items-center relative
                  w-full max-w-sm sm:max-w-md m-auto py-6
                text-gray-800 text-sm sm:text-base tracking-tight
              ${
                props.showAnimation &&
                'transform scale-95 opacity-0 transition delay-25 duration-50'
              }`}
    >
      {/* MODE CARD HEADING */}
      <hgroup>
        <h2
          tabIndex="0"
          className="text-base sm:text-lg font-bold uppercase tracking-widest text-center focus:outline-none"
        >
          {props.modeName}
        </h2>
        <h3 className="text-sm sm:text-base italic tracking-wider text-center lowercase mb-3">
          {`from the ${props.parentTonality} scale family`}
        </h3>
      </hgroup>

      {/* SCALE FIGURE*/}
      <VexStaff key={props.absoluteMC} {...props} />

      {/* MODE-SHIFT BUTTON PANEL */}
      <div className="flex">
        {buttons.map((button) => (
          <button
            name={button.name}
            key={button.name}
            className="tab-selection p-2 text-gray-600 hover:text-gray-800"
            {...button.clicks}
          >
            <svg
              className="h-5 w-5 fill-current cursor-pointer"
              viewBox="0 0 20 20"
            >
              <path d={button.path} />
            </svg>
          </button>
        ))}
      </div>

      {/* CHORD TABLE */}
      <ChordTable {...props} />

      {/* CLOSE MODE-CARD BUTTON */}
      <button
        name="close mode-card"
        className="absolute top-0 right-0 tab-selection p-2 m-1 text-gray-600 hover:text-gray-800"
        onClick={props.closeCard}
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

export default ModeCard;
