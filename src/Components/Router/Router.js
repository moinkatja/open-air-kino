import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import App from "../../App";
import history from '../../history';

function RouterFile() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact path="/open-air-kino"
          render={() => (
            <App tab="cinemas" />
          )}
        />
        <Route
          exact path="/open-air-kino/:tab(cinemas|favorites)/:cinemaId?"
          render={({ match }) => (
            <App
              cinemaId={match.params.cinemaId}
              tab={match.params.tab}
            />
          )} />
        <Redirect to="/open-air-kino" />
      </Switch>
    </Router>
  )
}

export default RouterFile

