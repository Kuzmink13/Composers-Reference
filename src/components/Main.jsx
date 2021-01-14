import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Scales from './Scales';
import App from './App';

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
        <Route path="/Scales" component={Scales} />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
