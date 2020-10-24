import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route';

import Home from '~/pages/Home';
import e404 from '~/pages/Errors/e404';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} isFree />

      <Route exact path="/404" component={e404} isFree />
      <Redirect to="/404" />
    </Switch>
  );
}
