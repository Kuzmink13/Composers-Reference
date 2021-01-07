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
          className="my-2 pl-5 sm:mr-5 whitespace-no-wrap
          text-sm sm:text-base font-medium hover:underline
          text-gray-600 hover:text-gray-800"
        >
          return to app
        </Link>
      </Navbar>
      <div className="w-full h-full overflow-y-auto scrolling-auto">
        <div className="flex flex-col mx-auto px-4 pt-12 pb-24 md:max-w-screen-md text-lg lg:text-xl">
          <h2 className="font-bold pb-6 text-3xl text-gray-900">
            Meet the Scales
          </h2>
          <p className="pb-6">
            Many of the core ideas behind Composer's Reference come from an
            effort to reduce the 49,000+ unique scales available in{' '}
            <a
              href="https://en.wikipedia.org/wiki/Equal_temperament"
              target="_"
              className="text-blue-600 hover:underline"
            >
              {'12-tone equal temperament'}
            </a>{' '}
            to a more manageable yet still complete subset. There are 4,096
            scales available in each of the twelve keys, so 4,096 becomes the
            starting point for a root-agnostic parent set of scales. Still, we
            can do better...
          </p>
          <p className="pb-6">
            A key assumption Composer's Reference makes about scales is that
            successive scale degrees must be separated by a minor, major, or
            augmented second. This means any scale that has a successive
            interval larger than an augmented second does not show up as a
            result.
          </p>
          <p className="pb-6">
            For example, let's say you have a C Major scale that is missing its{' '}
            {replaceSymbols('Anat')}. This is a six-note scale that has a major
            third between G and B:
          </p>
          <VexFigure
            pitches={[0, 2, 4, 5, 7, 11]}
            caption="C Major (without Anat)"
            autoMargins={true}
          />
          <p className="pb-6">
            Instead of displaying it as a unique scale, as we have done above,
            Composer's Reference will consider <i>C without A</i> to be a subset
            of C Major and omit it from the results. Not only that, but it will
            recognize that C Harmonic Major is another possible superset of this
            collection and add that to the results as well. Note that C Harmonic
            Major has an {replaceSymbols('Ab')} instead of an{' '}
            {replaceSymbols('Anat')} as the sixth scale degree:
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure pitches={[0, 2, 4, 5, 7, 9, 11]} caption="C Major" />
            <VexFigure
              pitches={[0, 2, 4, 5, 7, 8, 11]}
              caption="C Harmonic Major"
            />
          </div>
          <p className="pb-6">
            Both of these scales work because <i>C without A</i> doesn't specify
            what kind of A needs to fit in the empty space between G and B, we
            just know we need <i>something</i> there so we don't violate our
            first assumption.
          </p>
          <p className="pb-6">
            But what about {replaceSymbols('A#')}? Why isn’t there a third
            result with an augmented second between scale degrees 5 and 6? It's
            because that would violate the second assumption Composer’s
            Reference makes: scales cannot contain two or more consecutive
            half-steps! Let’s take a look:
          </p>
          <VexFigure
            pitches={[0, 2, 4, 5, 7, 10, 11]}
            caption="C Major #6"
            autoMargins={true}
          />
          <p className="pb-6">
            Notice the chromatic walkup from {replaceSymbols('A#')} to{' '}
            {replaceSymbols('Bnat')} to C. Composer’s reference does not
            consider the {replaceSymbols('Bnat')} to be an independent scale
            degree. Why? Because it thinks of it as a chromatic passing note
            instead.
          </p>

          <p className="pb-6">
            A skilled composer can employ chromatic passing notes in any scalar
            construct at will, so it doesn't benefit the analysis to consider
            any scale that happens to have one a unique result.
          </p>
          <p className="pb-6">
            If we agree that the {replaceSymbols('Bnat')} is a passing note and
            remove it from the collection we are left with two possible results:
            C Mixolydian and C Aeolian Dominant where in both the{' '}
            {replaceSymbols('A#')} becomes an enharmonic {replaceSymbols('Bb')}{' '}
            and an {replaceSymbols('Anat')} or an {replaceSymbols('Ab')} is
            added back in respectively.
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
            Using these assumptions, we can narrow-in the boundaries of our
            reduced subset of scales. Without any constraints the most notes a
            scale can have is twelve (the chromatic scale), but since we can’t
            use scales with consecutive half-steps, we know the actual number
            must be less.
          </p>
          <p className="pb-6">
            To find the true upper-bound we need a method for cramming in as
            many notes into a scale as possible without violating our
            assumptions. The solution is to alternate building a scale with
            whole-steps and half-steps until the range of the notes equals an
            octave. What we get is an eight-note scale called Diminished. It has
            another mode called Diminished Inverse which uses the same pattern
            but reverses the order of the intervals.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 3, 5, 6, 8, 9, 11]}
              caption="C Diminished"
            />
            <VexFigure
              pitches={[0, 1, 3, 4, 6, 7, 9, 10]}
              caption="C Diminished Inverse"
            />
          </div>
          <p className="pb-6">
            These two modes comprise our first scale-family: Diminished! This is
            one of seven scale-families that ships with Composer’s Reference.
            The term <i>scale-family</i> refers to the collection of all modes
            derived from a given parent scale. While any of a family's modes can
            be act as the parent scale, we have chosen the most historically
            common to represent each family.
          </p>
          <h3 className="font-bold py-6 text-2xl text-gray-900">
            Finding a Lower-Bound
          </h3>
          <p className="pb-6">
            Now let’s shift our attention toward defining a lower-bound. Using
            our previous assumption that the largest interval you can have
            between scale degrees is an augmented-second, constructing a scale
            with the fewest possible notes becomes trivial:
          </p>
          <VexFigure
            pitches={[0, 3, 6, 9]}
            caption="C Diminished Seventh"
            autoMargins={true}
          />
          <p className="pb-6">
            Though something isn’t quite right. This four-note collection
            doesn't really feel like a scale at all. It would be more accurate
            to call it a fully-diminished seventh arpeggio instead. Clearly
            there is need for one more rule: A scale cannot contain fewer notes
            than could fit within an octave without violating the first two
            rules. If a note <i>can</i> be added, a note <i>must</i> be added.
          </p>
          <p className="pb-6">
            Under this new assumption, the C Diminished Seventh Arpeggio is no
            longer a valid scale since there are a number of places where notes
            could be included without violating the first two rules. Don’t worry
            though, smaller collections like this aren’t going anywhere. They
            are always there to be found, hiding as subsets of the main scales.
            An example of a scale that contains this collection is C Lydian{' '}
            {replaceSymbols('#2')}:
          </p>
          <VexFigure
            pitches={[0, 3, 4, 6, 7, 9, 11]}
            caption="C Lydian #2"
            autoMargins={true}
          />
          <p className="pb-6">
            Now, with this third and final assumption in place, we are left with
            two possible strategies to construct a lower-bound scale. The first
            is to continuously raise each successive note by whole-step until
            the collection meets the octave. From there, adding any additional
            notes would violate the consecutive half-step rule. What we end up
            with is our second scale-family: Whole Tone, a perfectly symmetrical
            six-note family with only one mode.
          </p>
          <VexFigure
            pitches={[0, 2, 4, 6, 8, 10]}
            caption="C Whole Tone"
            autoMargins={true}
          />
          <p className="pb-6">
            The second strategy, similar to what we did to generate the
            upper-bound scale, is to stack alternating augmented and minor
            seconds. Like the Whole Tone scale, this collection ends up with six
            notes at the point you can't add any more. The resulting
            scale-family, our third, is called Augmented. It has two modes:
            Augmented and Augmented Inverse.
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
            out which seven-note scales satisfy our assumptions. I’ll just jump
            straight to the punchline and tell you that there are four more
            scale families that have seven modes each. They are based off of the
            Major, Melodic Minor, Harmonic Minor and Harmonic Major scales.
            We’ve already seen two of these parent scales in an earlier example.
            Here are the other two:
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
            mode from each of the seven scale families supported by Composer’s
            Reference. We’ve reduced the number of possibilities for each root
            note from 4,096 to just 33, all without limiting the scope of
            musical expression. Smaller ideas can still be reached by taking
            notes away, larger ideas can still be reached by adding notes back
            in, but these 33 scales serve as a concrete starting point. The full
            range of possibilities is still available, only now with a much more
            digestible set of base components!
          </p>
          <div className="box mb-6 p-2 overflow-x-auto scrolling-auto">
            <table className="text-base text-center">
              <thead>
                <tr>
                  <th className="te" id=" ">
                    Whole Tone
                  </th>
                  <th className="te" id="augmented">
                    Augmented
                  </th>
                  <th className="te" id="major">
                    Major
                  </th>
                  <th className="te" id="melodic-minor">
                    Melodic Minor
                  </th>
                  <th className="te" id="harmonic-minor">
                    Harmonic Minor
                  </th>
                  <th className="te" id="harmonic-major">
                    Harmonic Major
                  </th>
                  <th className="te-b" id="diminished">
                    Diminished
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="te" headers=" ">
                    Whole Tone
                  </td>
                  <td className="te" headers="augmented">
                    Augmented
                  </td>
                  <td className="te" headers="major">
                    Lydian
                  </td>
                  <td className="te" headers="melodic-minor">
                    Lydian Augmented
                  </td>
                  <td className="te" headers="harmonic-minor">
                    {replaceSymbols('Lydian #2')}
                  </td>
                  <td className="te" headers="harmonic-major">
                    {replaceSymbols('Lydian Augmented #2')}
                  </td>
                  <td className="te-b" headers="diminished">
                    Diminished
                  </td>
                </tr>
                <tr>
                  <td className="te" />
                  <td className="te" headers="augmented">
                    Augmented Inverse
                  </td>
                  <td className="te" headers="major">
                    Ionian
                  </td>
                  <td className="te" headers="melodic-minor">
                    Lydian Dominant
                  </td>
                  <td className="te" headers="harmonic-minor">
                    Major Augmented
                  </td>
                  <td className="te" headers="harmonic-major">
                    {replaceSymbols('Melodic Minor #4')}
                  </td>
                  <td className="te-b" headers="diminished">
                    Diminished Inverse
                  </td>
                </tr>
                <tr>
                  <td className="te" />
                  <td className="te" />
                  <td className="te" headers="major">
                    Mixolydian
                  </td>
                  <td className="te" headers="melodic-minor">
                    Melodic Minor
                  </td>
                  <td className="te" headers="harmonic-minor">
                    Lydian Minor
                  </td>
                  <td className="te" headers="harmonic-major">
                    Harmonic Major
                  </td>
                  <td className="te-b" />
                </tr>
                <tr>
                  <td className="te" />
                  <td className="te" />
                  <td className="te" headers="major">
                    Dorian
                  </td>
                  <td className="te" headers="melodic-minor">
                    Aeolian Dominant
                  </td>
                  <td className="te" headers="harmonic-minor">
                    Harmonic Minor
                  </td>
                  <td className="te" headers="harmonic-major">
                    {replaceSymbols('Mixolydian b2')}
                  </td>
                  <td className="te-b" />
                </tr>
                <tr>
                  <td className="te" />
                  <td className="te" />
                  <td className="te" headers="major">
                    Aeolian
                  </td>
                  <td className="te" headers="melodic-minor">
                    {replaceSymbols('Dorian b2')}
                  </td>
                  <td className="te" headers="harmonic-minor">
                    Phrygian Dominant
                  </td>
                  <td className="te" headers="harmonic-major">
                    {replaceSymbols('Dorian b5')}
                  </td>
                  <td className="te-b" />
                </tr>
                <tr>
                  <td className="te" />
                  <td className="te" />
                  <td className="te" headers="major">
                    Phrygian
                  </td>
                  <td className="te" headers="melodic-minor">
                    {replaceSymbols('Locrian nat2')}
                  </td>
                  <td className="te" headers="harmonic-minor">
                    {replaceSymbols('Locrian nat6')}
                  </td>
                  <td className="te" headers="harmonic-major">
                    {replaceSymbols('Altered nat5')}
                  </td>
                  <td className="te-b" />
                </tr>
                <tr>
                  <td className="te-r" />
                  <td className="te-r" />
                  <td className="te-r" headers="major">
                    Locrian
                  </td>
                  <td className="te-r" headers="melodic-minor">
                    Altered
                  </td>
                  <td className="te-r" headers="harmonic-minor">
                    Altered Diminished
                  </td>
                  <td className="te-r" headers="harmonic-major">
                    {replaceSymbols('Locrian bb7')}
                  </td>
                  <td className="px-1" />
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pb-6">
            If this is still overwhelming, my advice would be to start by
            analyzing the modes of the Major scale-family and internalizing how
            each of them relates to the Major Scale (Ionian). This will make it
            easier to grasp the alterations found in more exotic scales like
            Lydian Augmented {replaceSymbols('#2')}.
          </p>
          <p className="pb-6">
            In this example, Lydian is the base scale, which is just Major with
            a raised 4th:
          </p>
          <VexFigure
            pitches={[0, 2, 4, 6, 7, 9, 11]}
            caption="C Lydian"
            autoMargins={true}
          />
          <p className="pb-6">
            Then, there are two alterations: <i>Augmented</i> and{' '}
            <i>{replaceSymbols('#2')}</i>.
          </p>
          <p className="pb-6">
            Augmented means that the scale must imply an augmented triad; it has
            to contain a natural 3rd and an raised 5th. Lydian already has the
            3rd, so we just raise the 5th:
          </p>
          <VexFigure
            pitches={[0, 2, 4, 6, 8, 9, 11]}
            caption="C Lydian Augmented"
            autoMargins={true}
          />
          <p className="pb-6">
            Finally, {replaceSymbols('#2')} signals that the scale has a raised
            2nd:
          </p>
          <VexFigure
            pitches={[0, 3, 4, 6, 8, 9, 11]}
            caption="C Lydian Augmented #2"
            autoMargins={true}
          />
          <p className="pb-6">
            Note: neighboring scale degrees may be used in place if
            enharmonically equivalent. An example of this is the Altered Scale
            where the lowered 4th may substitute for a natural 3rd for chordal
            implications
          </p>
          <VexFigure
            pitches={[0, 1, 3, 4, 6, 8, 10]}
            caption="C Altered"
            autoMargins={true}
          />
          <h3 className="font-bold py-6 text-2xl text-gray-900">
            But What About the Pentatonic Scales?
          </h3>
          <p className="pb-6">
            A notable omission from Composer’s Reference are the standard
            pentatonic scales which are common across many musical traditions.
            One way to think about these scales is as subsets of the Major
            scale-family. In this framework, each scale is constructed by
            removing notes that don’t fit well with the harmonic implications of
            its parent scale.
          </p>
          <p className="pb-6">
            As an example, the G Major Pentatonic scale omits the notes C and{' '}
            {replaceSymbols('F#')} because their half-step proximity create
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
            a subset of not just G Major, but of G Lydian and G Mixolydian as
            well. (G Lydian Dominant fits here as well, but that comes from a
            different scale-family)
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
            So why aren’t these scales (and others like them) included in
            Composer's Reference? While they do have their own unique character
            that’s inarguably different than that of their parent scales, you
            can replicate the effect by using any of the parent scales and
            simply not using all of the notes.
          </p>
          <p className="pb-6">
            Composer’s Reference puts a lot of emphasis on not repeating itself.
            It’s how we’re able to be complete and concise at the same time. An
            unfortunate consequence of this is that some familiar structures
            have to be left out for the sake of consistency. Including one
            pentatonic scale-family, would mean having to rationalize all of
            them; their inclusion would violate the third assumption.
          </p>
          <p className="pb-6">
            Still, we believe that this is not a reason to worry. Whether you’re
            aware of these constructs or not, they’re always available to be
            used as implied subsets of the main results. It might just take a
            little bit of ear, a little bit of taste, and a little bit of
            creativity to unlock their full potential.
          </p>
          <h3 className="font-bold py-6 text-2xl text-gray-900">
            A Note on Modal Organization
          </h3>
          <p className="pb-6">
            Traditionally, modes are organized by scale degree relative to their
            parent scale. For example, G Dorian is the second mode of the F
            Major scale, A Phrygian is the third, etc.
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
              caption="A Phrygian"
            />
          </div>
          <p className="pb-6">
            This approach, however, leaves much to be desired.
          </p>
          <p className="pb-6">
            A common misconception about modes comes from the choice of using
            relative instead of parallel modes. Musicians learning about modes
            for the first time are often disappointed to find that playing
            something in G Dorian can sound frustratingly similar to playing
            something in F Ionian since both use the exact same notes. In the
            end, the ear wants to fall back on the framework that it’s used to
            hearing, which is the major scale.
          </p>
          <p className="pb-6">
            To get the most out of modes, one should transpose them back into
            their original key. G Dorian becomes F Dorian, A Phrygian becomes F
            Phrygian, etc. This has the transformative effect of adding a huge
            amount of color to our musical toolbox since each mode has its own
            unique personality and characteristics.
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
              caption="F Phrygian"
            />
          </div>
          <p className="pb-6">
            As a consequence, there emerges a much more intuitive way to
            organize the modes of a scale-family than by the order they
            naturally appear in an arbitrarily chosen parent scale: by degree of
            brightness (based on composite sharpness).
          </p>
          <p className="pb-6">
            We can arrange the scales in order by the number of sharps (or
            flats) they have relative to the original key. F Lydian has one less
            flat than F major, so it is one degree brighter. F Mixolydian, in
            contrast, has one more flat than F Major making it one degree
            darker.
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
            Note: this kind of comparison requires scales to have the same
            tonic. It is nonsensical to suggest that G Ionian is one degree
            brighter than C Ionian because it has one more sharp.
          </p>
          <p className="pb-6">
            Following this pattern, we arrive at the following order for the
            modes of the Major scale-family (from brightest to darkest): Lydian,
            Ionian, Mixolydian, Dorian, Aeolian, Phrygian, Locrian.
          </p>
          <p className="pb-6">
            This ordering lets us judge the qualities of the individual modes
            against each other. Are you playing in D Aeolian but want to bring
            the mood down? Shift down one level of brightness to D Phrygian.
            Nice.
          </p>
          <div className="flex flex-col sm:flex-row justify-evenly">
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 8, 10]}
              pitchCenter={2}
              caption="D Aeolian"
            />
            <VexFigure
              pitches={[0, 1, 3, 5, 7, 8, 10]}
              pitchCenter={2}
              caption="D Phrygian"
            />
          </div>
          <p className="pb-6">
            In addition, arranging the modes this way has the added benefit of
            ordering them by the circle of fifths. We know that D Phrygian has
            one more flat than D Aeolian, but which one? It's{' '}
            {replaceSymbols('Eb')}, the next in the circle of fifths.
          </p>
          <p className="pb-6">
            Note: this only applies to diatonic scales (the Major scale-family).
          </p>
          <p className="pb-6">
            For non-diatonic scales which frequently contain both sharps and
            flats, add the number of sharps (+1) and flats (-1) to get the
            composite sharpness of the scale.
          </p>
          <p className="pb-6">
            For example, G Harmonic Minor has one sharp and two flats, giving it
            a composite sharpness of minus-one, which is one degree brighter
            than G Phrygian Dominant, which has two flats and no sharps.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-evenly">
            <VexFigure
              pitches={[0, 2, 3, 5, 7, 8, 11]}
              pitchCenter={7}
              caption="G Harmonic Minor"
            />
            <VexFigure
              pitches={[0, 1, 4, 5, 7, 8, 10]}
              pitchCenter={7}
              caption="G Phrygian Dominant"
            />
          </div>
          <p className="pb-6">
            This type of structure becomes a little more subjective when dealing
            with non-diatonic scale-families because there is often more than a
            single note difference between neighboring modes. Since, not all
            scale degrees are created equal, not all scale degree alterations
            have the same effect on a scale's perceived brightness. That being
            said, Composer's Reference defines brightness as an objective
            measure based on the composite sharpness of a scale, not as a
            subjective measure of how bright a scale sounds. While this model
            may not be perfect, it still serves as a useful organizational
            pattern and is used throughout the app.
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Scales;
