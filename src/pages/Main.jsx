/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import About from './About';
// import Contact from './Contact';
import Scales from './Scales';
import References from './References';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" component={Contact} /> */}
        <Route path="/scales" element={<Scales />} />
        <Route path="/references" element={<References />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
