import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import App from "../../App";
import history from '../../history';

function RouterFile() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact path="/"
          render={() => (
            <App tab="cinemas" />
          )}
        />

        <Route
          exact path="/:tab(cinemas|favorites|city)"
          render={({ match }) => (
            <App
              tab={match.params.tab}
              path={match}
            />
          )} />

        <Route
          exact path="/:tab(cinemas|favorites|city)/:cinemaId?"
          render={({ match }) => (
            <App
              cinemaId={match.params.cinemaId}
              tab={match.params.tab}
              path={match}
            />
          )} />

        {/* <Route
          exact path="/cinemas"
          render={() => (
            <App />
          )} />*/}
        <Redirect to="/" />
      </Switch>
    </Router>
  )

}

export default RouterFile

