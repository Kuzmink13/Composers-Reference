/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React, { Fragment } from 'react';

import Navbar from '../components/Navbar';
import NavButtons from '../components/NavButtons';
import Options from '../components/Options';
import Menu from '../components/Menu';
import PopOvers from '../components/PopOvers';
import Keys from '../components/Keys';
import ButtonPanel from '../components/ButtonPanel';
import ModePanel from '../components/ModePanel';
import Footer from '../components/Footer';

import useKeyboard from '../hooks/useKeyboard';
import useScreenSize from '../hooks/useScreenSize';

function App() {
  useKeyboard();
  useScreenSize();

  // RENDER
  return (
    <Fragment>
      <Navbar>
        <NavButtons options={<Options />} menu={<Menu />} />
      </Navbar>

      <PopOvers />

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
