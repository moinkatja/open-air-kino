import React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "../../App";

function RouterFile() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route
          exact path="/"
          render={() => (
            <App tab="cinemas" />
          )}
        />
        <Route
          exact path="/:tab(cinemas|favorites)/:cinemaId?"
          render={({ match }) => (
            <App
              cinemaId={match.params.cinemaId}
              tab={match.params.tab}
            />
          )} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  )
}

export default RouterFile

