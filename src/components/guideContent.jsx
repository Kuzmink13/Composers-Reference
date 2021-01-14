import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import VexFigure from './VexFigure';
import SmartLink from './SmartLink';
import VideoEmbed from './VideoEmbed';

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
      To get started, Composer’s Reference requires a{' '}
      <i>
        <SmartLink term="set">pitch class set</SmartLink>
      </i>
      , an unordered collection of notes{' '}
      <SmartLink term="pitch class">(pitch classes)</SmartLink> that represent
      an abstract musical idea. A fragment can be a deconstructed melody, a
      chord, or any otherwise related group of notes:
    </p>
    <VexFigure
      pitches={[0, 4, 5, 7]}
      autoMargins={true}
      showBox={false}
      mb6={false}
    />
    <p className="mb-4">
      Show us your set by selecting its notes on the on-screen keyboard or with
      your computer keyboard:
    </p>
    <VideoEmbed
      key="note_selection"
      classAddOn="h-40 mb-4"
      src="videos/note_selection.mp4"
    />
    <p className="mb-4">
      Tip: you can toggle various keyboard overlays in the settings drop-down
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      The Scales Are Coming!
    </h3>
    <p className="mb-4">
      When you start selecting notes, the bottom part of the screen instantly
      fill up with results! These are the scales Composer’s Reference knows that
      contain all the notes in your set!
    </p>
    <VideoEmbed
      key="scale_generation"
      classAddOn="h-80 mb-4"
      src="videos/scale_generation.mp4"
    />
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Time to Get Creative!
    </h3>
    <p className="mb-4">
      There are many ways to work these results back into your music. Here’s a
      few ideas to get you started:
    </p>
    <ul className="list-disc px-8 pb-2">
      <li className="pb-2">
        Use your newfound scalar wisdom to write an exciting melody that relates
        to your chosen set
      </li>
      <li className="pb-2">
        See what disparate tonalities are related to your original idea and
        string them together to go on a musical journey around the circle of
        fifths
      </li>
      <li className="pb-2">
        Take some chord changes and turn them into sets. Then use the results to
        improvise a dynamic solo to take your{' '}
        <span className="tracking-widest">jazz</span> to the next level
      </li>
    </ul>
    <p className="mb-4">
      Tip: to get the most out of Composer’s Reference,{' '}
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
      If you find that there are just too many options to work with, Composer’s
      Reference offers a few ways to help narrow down what you’re looking for:
    </p>
    <ul className="list-disc px-8 pb-2">
      <li className="pb-2">
        <p className="pb-2">
          Six, seven, and eight notes scales are separated into their own
          results panels. Click the buttons to toggle between them.
        </p>
        <VideoEmbed
          key="length_selection"
          classAddOn="h-12"
          src="videos/length_selection.mp4"
        />
      </li>
      <li className="pb-2">
        <p className="pb-2">
          Filter for a specific key by holding down <i>shift</i> and selecting a
          note as usual. (long-press on mobile)
        </p>
        <VideoEmbed
          key="root_selection"
          classAddOn="h-40"
          src="videos/root_selection.mp4"
        />
      </li>
    </ul>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Too Many Notes! (pt.2)
    </h3>
    <ul className="list-disc px-8 pb-2">
      <li className="pb-2">
        <p className="pb-2">
          Visit the settings drop-down to filter for scales that have one of
          your selected notes as a tonic.
        </p>
        <VideoEmbed
          key="fiilter_settings"
          classAddOn="h-80"
          src="videos/filter_settings.mp4"
        />
      </li>
      <li className="pb-2">
        The settings drop down is also where you can filter out scale-families
        that you never want to see in your results
      </li>
    </ul>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      We Need To Go Deeper...
    </h3>
    <p className="mb-4">
      Now it’s time to get into the heart of the Composer’s Reference workflow!
      Click on a scale to enter the <i>mode-card view</i>. Here, Composer’s
      Reference will generate a list of{' '}
      <SmartLink term="chord scale system">tonic chords</SmartLink> that are
      implied by the chosen scale.
    </p>
    <VideoEmbed
      key="open_card"
      classAddOn="h-80 mb-4"
      src="videos/open_card.mp4"
    />
    <p className="mb-4">
      You can now effortlessly pair music written from that scale with any
      number of chords that fit over its structure.
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      More Chords Please!
    </h3>
    <p className="mb-4">
      Want the chords from a neighoring scale degree instead? Click the
      left/right arrows (or use the arrow keys) to move to the next{' '}
      <SmartLink term="relative key">relative mode</SmartLink> in your key.
    </p>
    <VideoEmbed
      key="lr_shift"
      classAddOn="h-80 mb-4"
      src="videos/lr_shift.mp4"
    />
    <p className="mb-4">
      Shift-select or long-press the left/right arrows to move by relative mode
      brightness instead.
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Time to Get Modal!
    </h3>
    <p className="mb-4">
      Eventually you will decide it's time to go beyond the constraints of a
      single pitch class set. When you're ready, click the up/down arrows to
      move to the <SmartLink term="parallel key">parallel mode</SmartLink> that
      is one degree brighter/darker than the current. This allows you to
      introduce brand new sounds into your music without leaving the key.
    </p>
    <VideoEmbed
      key="ud_shift"
      classAddOn="h-80 mb-4"
      src="videos/ud_shift.mp4"
    />
    <p className="mb-4">
      If you want to move beyond your key altogether, shift-select or long-press
      the up/down arrows to step through the{' '}
      <SmartLink term="transpositional equivalence">
        transpositionally equivalent
      </SmartLink>{' '}
      scales in the <SmartLink>circle of fifths</SmartLink>.
    </p>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      Mode-Card Movement Recap
    </h3>
    <p className="mb-4">
      Combinging the four ways of moving between mode-cards lets you find new
      tonalities quickly and organically. That's why it's important to have a
      strong understanding of mode-card motion before jumping in. Here's a quick
      summary:
    </p>
    <ul className="list-disc px-8 pb-2 mx-auto">
      <li className="pb-2">
        <b>left/right:</b> previous/next relative mode by scale degree
      </li>
      <li className="pb-2">
        <b>shift + left/right:</b> previous/next relative mode by brightness
      </li>
      <li className="pb-2">
        <b>down/up:</b> previous/next parallel mode by brightness
      </li>
      <li className="pb-2">
        <b>shift + down/up:</b> previous/next key via circle of fifths
      </li>
    </ul>
  </Fragment>,

  <Fragment>
    <h3 className="text-xl font-bold tracking-wider text-center mb-4">
      That's All For Now!
    </h3>
    <p className="mb-4">
      Composer's Reference is a simple tool with with complex implications.
      There are over four thousand possible pitch class sets that can reduce to
      any of the thirty-three supported transpositionally equivalent scales.
    </p>
    <p className="mb-4">
      While Composer's Reference can never be a true subsitute for knowing your
      music theory, we can offer some resources to make using it more effective:
    </p>
    <ul className="list-disc px-8 pb-2 mx-auto">
      <li className="pb-2">
        <Link to="./scales" className="external-link">
          Meet the Scales:
        </Link>{' '}
        a primer on the scale-theory concepts behind Composer's Reference
      </li>
      <li className="pb-2">
        <Link to="./glossary" className="external-link">
          Glossary:
        </Link>{' '}
        more on terms commonly used throughout Composer's Reference
      </li>
    </ul>
    <p className="text-center text-base pb-4">
      Have a feature request?{' '}
      <Link to="./contact" className="external-link">
        Submit it here!
      </Link>
    </p>
  </Fragment>,
];

export default guideContent;
