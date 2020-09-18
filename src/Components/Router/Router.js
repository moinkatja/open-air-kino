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
          )} />

        <Route
          exact path="/:tab(cinemas|favorites)/:cinemaId"
          render={(match) => (
            <App
              cinemaId={match.match.params.cinemaId}
              tab={match.match.params.tab}
              path={match.match}
            />
          )} />
         <Route
          eaxct path="/:tab(cinemas|favorites)"
          render={(match) => (
            <App
              tab={match.match.params.tab}
              path={match.match}
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

