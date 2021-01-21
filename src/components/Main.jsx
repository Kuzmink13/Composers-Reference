/**
 * Copyright (c) Konstantin Kuzmin. All Rights Reserved.
 * This source code is licensed under the GNU General Public License v3.0
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import About from './About';
import Contact from './Contact';
import Scales from './Scales';
import Glossary from './Glossary';

import useNotes from '../hooks/useNotes';
import useQuickGuide from '../hooks/useQuickGuide';

function Main() {
  const noteProps = useNotes();
  const quickGuideProps = useQuickGuide();
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => <App {...{ noteProps, quickGuideProps }} />}
        />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/scales" component={Scales} />
        <Route path="/glossary" component={Glossary} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
