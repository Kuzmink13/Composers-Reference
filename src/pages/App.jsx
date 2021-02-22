/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Navbar';
import NavButtons from '../components/NavButtons';
import Options from '../components/Options';
import Menu from '../components/Menu';
import PopOver from '../components/PopOver';
import QuickGuide from '../components/QuickGuide';
import ModeCard from '../components/ModeCard';
import Keys from '../components/Keys';
import ButtonPanel from '../components/ButtonPanel';
import ModePanel from '../components/ModePanel';
import Footer from '../components/Footer';

import useKeyboard from '../hooks/useKeyboard';

import { getIsGuideShown, getIsModeCardShown } from '../redux/selectors';
import { closeModeCard, toggleGuideShown } from '../redux/actions';

function App() {
  const dispatch = useDispatch();
  const isModeCardShown = useSelector(getIsModeCardShown);
  const isGuideShown = useSelector(getIsGuideShown);
  useKeyboard();

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
        <Keys />
        <ButtonPanel />
        <ModePanel />
      </main>

      <Footer />
    </Fragment>
  );
}

export default App;
