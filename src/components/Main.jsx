import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Scales from './Scales';
import App from './App';

import useNotes from '../hooks/useNotes';

function Main() {
  const noteProps = useNotes();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <App {...{ noteProps }} />} />
        <Route path="/Scales" component={Scales} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
