/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';
import NavButtons from './NavButtons';
import Options from './Options';
import Menu from './Menu';
import PopOver from './PopOver';
import QuickGuide from './QuickGuide';
import ModeCard from './ModeCard';
import Keys from './Keys';
import ButtonPanel from './ButtonPanel';
import ModePanel from './ModePanel';
import Footer from './Footer';

import useKeyboard from '../hooks/useKeyboard';
import useScreenSize from '../hooks/useScreenSize';

import { getIsGuideShown, getIsModeCardShown } from '../redux/selectors';
import { closeModeCard, toggleGuideShown } from '../redux/actions';

function App() {
  const dispatch = useDispatch();
  const [screenHeight, screenWidth] = useScreenSize();
  useKeyboard();

  const isModeCardShown = useSelector(getIsModeCardShown);
  const isGuideShown = useSelector(getIsGuideShown);

  // RENDER
  return (
    <Fragment>
      <Navbar>
        <NavButtons options={<Options />} menu={<Menu />} />
      </Navbar>

      {isModeCardShown && (
        <PopOver
          closeFn={() => dispatch(closeModeCard())}
          ID="mode-card-pop-over"
          showCloseButton={true}
        >
          <ModeCard />
        </PopOver>
      )}

      {isGuideShown && (
        <PopOver
          closeFn={() => dispatch(toggleGuideShown())}
          ID="guide-pop-over"
          isAnimated={false}
          isWide={true}
          showCloseButton={true}
        >
          <QuickGuide />
        </PopOver>
      )}

      <main className="flex-grow w-full overflow-y-hidden mx-auto flex flex-col lg:max-w-screen-lg">
        <Keys {...{ screenWidth, screenHeight }} />
        <ButtonPanel />
        <ModePanel />
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
