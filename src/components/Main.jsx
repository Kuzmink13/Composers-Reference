import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Scales from './Scales';
import App from './App';

function Main() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/Scales" component={Scales} />
      </Switch>
    </Router>
  );
}

export default Main;
