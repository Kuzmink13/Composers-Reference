/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import About from './About';
// import Contact from './Contact';
import Scales from './Scales';
import References from './References';

function Main() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/about" component={About} />
        {/* <Route path="/contact" component={Contact} /> */}
        <Route path="/scales" component={Scales} />
        <Route path="/references" component={References} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
