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
            caption="C Diminished Seventh"
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
          <div className="box mb-6 py-2">
            <table className="text-base text-center">
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
          <h3 className="font-bold py-6 text-2xl text-gray-900">
            But What About the Pentatonic Scales?
          </h3>
          <p className="pb-6">
            A notable omission from Composer’s Reference are the standard
            pentatonic scales which are particularly common in jazz and guitar
            music. These scales are derived from the modes of the major scale
            and are often thought to be constructed by removing notes that don’t
            fit as nicely with the harmonic implications of a particular scale.
          </p>
          <p className="pb-6">
            As an example, the G Major Pentatonic scale omits the notes C and{' '}
            {replaceSymbols('F#')} because their half-step intervals create
            tension against neighboring notes.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 9, 11]}
              pitchCenter={7}
              caption="G Major"
            />
            <VexFigure
              pitches={[0, 2, 4, 7, 9]}
              pitchCenter={7}
              caption="G Major Pentatonic"
            />
          </div>
          <p className="pb-6">
            Since the omission of C and {replaceSymbols('F#')} ambiguates the
            parent mode of the G Major Pentatonic scale, it can be thought of as
            a subset to not just G Major, but of G Lydian and G Mixolydian as
            well.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 4, 6, 7, 9, 11]}
              pitchCenter={7}
              caption="G Lydian"
            />
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 9, 10]}
              pitchCenter={7}
              caption="G Mixolydian"
            />
          </div>
          <p className="pb-6">
            So why aren’t these scales (and others like them) included? While
            they do have their own unique character that’s inarguably different
            than their parent scales, you can replicate the effect by using any
            of the parent scales and simply not using all of the notes.
          </p>
          <p className="pb-6">
            Composer’s Reference puts a lot of emphasis on not repeating itself.
            It’s how we’re able to be complete and concise at the same time. An
            unfortunate consequence of this is that some familiar structures
            have to be left out for the sake of consistency, but we believe
            that’s not a reason to worry. Whether you’re aware of these
            constructs or not, they’re always available to be used as implied
            subsets of the main results. It might just take a little bit of ear,
            a little bit of taste, and a little bit of creativity to unlock
            their full potential.
          </p>
          <h3 className="font-bold py-6 text-2xl text-gray-900">
            A Note on Modal Organization
          </h3>
          <p className="pb-6">
            Traditionally, modes are ordered by the scale degree that parent
            scale the mode is based on. For example, G Dorian is the second mode
            of the F Major scale, A Phrygian is the third, etc.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-evenly">
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 9, 11]}
              pitchCenter={5}
              caption="F Major"
            />
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 9, 10]}
              pitchCenter={7}
              caption="G Dorian"
            />
            <VexFigure
              pitches={[0, 1, 3, 5, 7, 8, 10]}
              pitchCenter={9}
              caption="A Phrigian"
            />
          </div>
          <p className="pb-6">
            This approach, however, leaves much to be desired.
          </p>
          <p className="pb-6">
            A common misconception relating to the understanding of modes comes
            from the choice of working with relative modes instead of parallel
            modes. Musicians learning about modes for the first time are often
            disappointed to find out that playing something in G Dorian can
            sound frustratingly similar to playing something in F Major since
            both use the exact same notes. In the end, the ear wants to fall
            back on the framework that it’s used to hearing, which is the major
            scale, but that’s just because we’re missing a step. To get the most
            out of modes, one should transpose them back into their original
            key. G Dorian becomes F Dorian, A Phrygian becomes F Phrygian, etc.
            This has the transformative effect of adding a huge amount of color
            to our musical toolbox since each mode has its own unique
            characteristics and moods.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 9, 10]}
              pitchCenter={5}
              caption="F Dorian"
            />
            <VexFigure
              pitches={[0, 1, 3, 5, 7, 8, 10]}
              pitchCenter={5}
              caption="F Phrigian"
            />
          </div>
          <p className="pb-6">
            Further, there is a much more intuitive way to organize the modes of
            a particular scale than by the order they naturally appear: by order
            of brightness (or degree for sharpness). We can arrange the scales
            in order of the number of sharps (or flats) they have relative to
            the original key. F Lydian has one less flat than F major, so it is
            one degree brighter. F Mixolydian, in contrast, has one more flat
            than F Major making it one degree darker.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 4, 6, 7, 9, 11]}
              pitchCenter={5}
              caption="F Lydian"
            />
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 9, 10]}
              pitchCenter={5}
              caption="F Mixolydian"
            />
          </div>
          <p className="pb-6">
            Following this pattern, we arrive at the following order for the
            modes of the major scale: Lydian, Ionian, Mixolydian, Dorian,
            Aeolian, Phrygian, Locrian.
          </p>
          <p className="pb-6">
            This ordering gives us the benefit of being able to judge the
            qualities of the individual modes against each other. Want to bring
            the mood down? Just dial back the degree of brightness of your
            scale.
          </p>
          <p className="pb-6">
            For scale families that are not the major scale, the exact same
            approach can’t be used because the brightness of the scales can’t be
            gauged by the number of sharps or flats alone. Instead, the scales
            are arranged by brightness of the implied chord first, and by number
            of sharps or flats second. F Aeolian Dominant has one more flat than
            F Melodic Minor so it should be darker, but because it implies an F
            Dominant Chord while F Melodic Minor implies an F Minor chord, F
            Aeolian Dominant is considered brighter. F Lydian Dominant is
            brighter still because it implies a dominant chord and has two fewer
            flats than F Aeolian Dominant.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-evenly">
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 9, 11]}
              pitchCenter={5}
              caption="F Melodic Minor"
            />
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 8, 10]}
              pitchCenter={5}
              caption="F Aeolian Dominant"
            />
            <VexFigure
              pitches={[0, 2, 4, 6, 7, 9, 10]}
              pitchCenter={5}
              caption="F Lydian Dominant"
            />
          </div>
          <p className="pb-6">
            The chords from darkest to brightest are as follows: Augmented,
            Major 7th, Dominant 7th, Minor-Major 7th, Minor 7th, half-dim 7th,
            fully-dim 7th
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Scales;
