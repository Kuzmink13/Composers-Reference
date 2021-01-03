import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import VexFigure from './VexFigure';

import { replaceSymbols } from '../logic/utilities';

function Scales() {
  return (
    <Fragment>
      <Navbar>
        <Link
          to="/"
          className="my-2 mr-5 text-gray-600 font-medium hover:underline hover:text-gray-800"
        >
          return to app
        </Link>
      </Navbar>
      <div className="w-full h-full overflow-y-auto scrolling-auto">
        <div className="mx-auto px-4 pt-12 pb-24 flex flex-col md:max-w-screen-md text-xl">
          <h2 className="font-bold pb-6 text-3xl text-gray-900">
            Meet the Scales
          </h2>
          <p className="pb-6">
            One of the core ideas behind Composer's Reference was to reduce the
            49,000+ unique scales available in{' '}
            <a
              href="https://en.wikipedia.org/wiki/Equal_temperament"
              target="_"
              className="text-blue-600 hover:underline"
            >
              {'12-tone equal temperament'}
            </a>{' '}
            to a more manageable yet complete still subset. There are 4,096
            scales available in each key. Making the set root-agnostic reduces
            it to that amount.
          </p>
          <p className="pb-6">
            A key assumption is that the only scales that would be considered by
            the application were scales with were each scale degree was
            separated by a second (minor, major, or augmented). This means any
            scale that contains an interval larger than an augmented second does
            not show up as a result.
          </p>
          <p className="pb-6">
            As an example, let's say you have a scale that looks like the major
            scale in C, but is missing an A-natural, creating a 6-note scale
            with major third between G and B:
          </p>
          <VexFigure
            pitches={[0, 2, 4, 5, 7, 11]}
            caption="C Major (-Anat)"
            autoMargins={true}
          />
          <p className="pb-6">
            Instead of calling this a unique scale, the app will consider this
            to be a possible subset of two unique scales: C Major and C Harmonic
            Major with an A-flat and an A-natural as the sixth scale degree
            respectively:
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure pitches={[0, 2, 4, 5, 7, 9, 11]} caption="C Major" />
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 8, 11]}
              caption="C Harmonic Major"
            />
          </div>
          <p className="pb-6">
            But what about A-sharp? Why isn’t there a third result with an
            augmented second between scale degrees 5 and 6? That’s because it
            would violate the second assumption composer’s reference makes: Your
            scale cannot contain two or more consecutive half-steps! Let’s take
            a look:
          </p>
          <VexFigure
            pitches={[0, 2, 4, 5, 7, 10, 11]}
            caption="C Major #6"
            autoMargins={true}
          />
          <p className="pb-6">
            Notice the chromatic walkup from A-sharp to C. Composer’s reference
            does not consider the b-natural to be a unique scale degree, but
            instead thinks of it as a chromatic passing tone. This pattern can
            be used in any scale at will. It does not help in our analysis to
            think of these as unique scales and only ambiguates the analysis.
            Instead, if we consider the b-natural a passing-note and remove it
            from the scale we are left with two possibilities as a result: C
            Mixolydian and C Aeolian Dominant where in both the A-sharp becomes
            an enharmonic B-flat and an A-natural or an A-flat are added back
            in, respectively.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 9, 10]}
              caption="C Mixolydian"
            />
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 8, 10]}
              caption="C Aeolian Dominant"
            />
          </div>

          <h3 className="font-bold py-6 text-2xl text-gray-900">
            Finding an Upper-Bound
          </h3>
          <p className="pb-6">
            Using these assumptions, we can start to narrow-in the boundaries of
            our final subset. Since we know we can’t have scales that contain
            any consecutive half-step, we can try to imagine a scale that
            contains the greatest number of half-steps and thus the greatest
            number of notes. To do this, alternate half-steps and whole steps
            until the scale repeats. What we get is an 8-note scale called
            Half-Whole Diminished. It has another mode called Whole-Half
            Diminished which uses the same pattern but reverses the order of the
            intervals.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 1, 3, 4, 6, 7, 9, 10]}
              caption="C Half-Whole Diminished"
            />
            <VexFigure
              pitches={[0, 2, 3, 5, 6, 8, 9, 11]}
              caption="C Whole-Half Diminished"
            />
          </div>
          <p className="pb-6">
            Thus, we have our first scale-family, or tonality: Diminished. This
            is one of seven tonalities that ships with Composer’s Reference. We
            also now know that, with our assumptions, there are no unique scales
            that contain more than eight notes!
          </p>

          <h3 className="font-bold py-6 text-2xl text-gray-900">
            Finding a Lower-Bound
          </h3>
          <p className="pb-6">
            Now let’s take a look at the lower-bound. With our previous
            assumption that the largest interval you can have between scale
            degrees is an augmented-second, the scale with the fewest possible
            notes looks like this:
          </p>
          <VexFigure
            pitches={[0, 3, 6, 9]}
            caption="C Diminished seventh"
            autoMargins={true}
          />
          <p className="pb-6">
            Though something isn’t quite right. This four-note scale is just a
            fully-diminished seventh arpeggio and doesn’t really look like a
            scale at all. Clearly there is need for one more assumption: if you
            can add a note to a scale without violating the first two
            assumptions, you have to do so. Don’t worry though, these smaller
            musical fragments aren’t going anywhere. They are always available,
            hiding as subsets of the main scales.
          </p>
          <p className="pb-6">
            With this third and final assumption in place, we are left with two
            possible strategies to construct a lower bound scale. The first is
            to fill it up entirely with whole-steps, giving use our second
            tonality: Whole-Tone, a perfectly symmetrical six-note scale with
            only one mode.
          </p>
          <VexFigure
            pitches={[0, 2, 4, 6, 8, 10]}
            caption="C Whole Tone"
            autoMargins={true}
          />
          <p className="pb-6">
            The second strategy, much like the one we used to generate the
            largest possible scale, is to alternate augmented seconds with minor
            seconds. This ensures a scale with the smallest number of scale
            degrees without room to add more. The resulting tonality, our third,
            is called augmented. It has two modes: augmented and augmented
            inverse.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure pitches={[0, 3, 4, 7, 8, 11]} caption="C Augmented" />
            <VexFigure
              pitches={[0, 1, 4, 5, 8, 9]}
              caption="C Augmented Inverse"
            />
          </div>

          <h3 className="font-bold py-6 text-2xl text-gray-900">
            Finding the Rest
          </h3>
          <p className="pb-6">
            Now that we have the boundaries set, all that’s left is to figure
            out what seven-note scales satisfy our assumptions. I’ll just jump
            straight to the punchline and tell you that there are four scale
            families of seven modes each. They are based off of the Major,
            Melodic Minor, Harmonic Minor and Harmonic Major scales. We’ve
            already seen two of these scales in an earlier example. Here are the
            other two:
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 9, 11]}
              caption="C Melodic Minor"
            />
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 8, 11]}
              caption="C Harmonic Minor"
            />
          </div>
          <p className="pb-6">
            And finally, to wrap it all up, here is a table that includes every
            single mode from each of the seven scale families supported by
            Composer’s Reference. We’ve reduced the number of possibilities for
            each root note from 4,096 to just 33, all without limiting the scope
            of musical expression. Anyone who can understand how this list came
            to be and knows the assumptions used to get there can utilize the
            full range of possibilities available in 12-tone equal temperament
            while leaning on a mental model that has a much more digestible set
            of base components!
          </p>

          <div className="pb-6">
            <table className="text-base">
              <thead>
                <tr>
                  <th id="whole-tone">Whole-Tone</th>
                  <th id="augmented">Augmented</th>
                  <th id="major">Major</th>
                  <th id="melodic-minor">Melodic Minor</th>
                  <th id="harmonic-minor">Harmonic Minor</th>
                  <th id="harmonic-major">Harmonic Major</th>
                  <th id="diminished">Diminished</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td headers="whole-tone">Whole-Tone</td>
                  <td headers="augmented">Augmented</td>
                  <td headers="major">Lydian</td>
                  <td headers="melodic-minor">Lydian Augmented</td>
                  <td headers="harmonic-minor">Major Augmented</td>
                  <td headers="harmonic-major">
                    {replaceSymbols('Lydian Augmented #2')}
                  </td>
                  <td headers="diminished">Whole-Half Diminished</td>
                </tr>
                <tr>
                  <td />
                  <td headers="augmented">Augmented Inverse</td>
                  <td headers="major">Ionian</td>
                  <td headers="melodic-minor">Lydian Dominant</td>
                  <td headers="harmonic-minor">
                    {replaceSymbols('Lydian #2')}
                  </td>
                  <td headers="harmonic-major">Harmonic Major</td>
                  <td headers="diminished">Half-Whole Diminished</td>
                </tr>
                <tr>
                  <td />
                  <td />
                  <td headers="major">Mixolydian</td>
                  <td headers="melodic-minor">Aeolian Dominant</td>
                  <td headers="harmonic-minor">Phrygian Dominant</td>
                  <td headers="harmonic-major">
                    {replaceSymbols('Mixolydian b2')}
                  </td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td headers="major">Dorian</td>
                  <td headers="melodic-minor">Melodic Minor</td>
                  <td headers="harmonic-minor">Harmonic Minor</td>
                  <td headers="harmonic-major">
                    {replaceSymbols('Melodic Minor #4')}
                  </td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td headers="major">Aeolian</td>
                  <td headers="melodic-minor">{replaceSymbols('Dorian b2')}</td>
                  <td headers="harmonic-minor">Lydian Minor</td>
                  <td headers="harmonic-major">
                    {replaceSymbols('Altered nat5')}
                  </td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td headers="major">Phrygian</td>
                  <td headers="melodic-minor">
                    {replaceSymbols('Locrian nat2')}
                  </td>
                  <td headers="harmonic-minor">
                    {replaceSymbols('Locrian nat6')}
                  </td>
                  <td headers="harmonic-major">
                    {replaceSymbols('Dorian b5')}
                  </td>
                  <td />
                </tr>
                <tr>
                  <td />
                  <td />
                  <td headers="major">Locrian</td>
                  <td headers="melodic-minor">Altered</td>
                  <td headers="harmonic-minor">Altered Diminished</td>
                  <td headers="harmonic-major">
                    {replaceSymbols('Locrian bb7')}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>

          <p className="pb-6">
            If this still has you overwhelmed, my advice would be to start by
            analyzing the modes of the Major scale family and internalizing how
            each of them relates to the major scale (Ionian). This will make it
            easier to grasp the alterations found in more exotic scales.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Scales;
